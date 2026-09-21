import { NextRequest, NextResponse } from "next/server";
import { generatePlanRequestSchema } from "@/features/generate/schema";
import { buildPrompt } from "@/lib/prompts/build-prompt";
import { streamCompletion, LLMError, LLMAbortError } from "@/services/llm";
import { getServerEnv } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Helper to extract client IP address for rate limiting.
 */
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export async function POST(req: NextRequest) {
  // 1. Verify server environment configuration
  let env;
  try {
    env = getServerEnv();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server configuration error";
    return NextResponse.json(
      {
        error: "Server is not configured properly to generate plans.",
        code: "SERVER_CONFIG_ERROR",
        details: process.env.NODE_ENV === "development" ? message : undefined,
      },
      { status: 500 }
    );
  }

  // 2. Extract client IP and enforce rate limiting
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(
    clientIp,
    env.RATE_LIMIT_MAX,
    env.RATE_LIMIT_WINDOW_MINUTES
  );

  if (!rateLimit.success) {
    const retryAfterSec = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
    return NextResponse.json(
      {
        error: `Rate limit exceeded. Maximum ${env.RATE_LIMIT_MAX} requests per ${env.RATE_LIMIT_WINDOW_MINUTES} minutes.`,
        code: "RATE_LIMITED",
        resetAt: rateLimit.resetAt,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, retryAfterSec)),
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.resetAt),
        },
      }
    );
  }

  // 3. Parse and validate request JSON body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON request body.",
        code: "BAD_REQUEST",
      },
      { status: 400 }
    );
  }

  const validationResult = generatePlanRequestSchema.safeParse(body);
  if (!validationResult.success) {
    const issues = validationResult.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return NextResponse.json(
      {
        error: issues[0]?.message || "Validation failed for request input.",
        code: "VALIDATION_ERROR",
        issues,
      },
      { status: 400 }
    );
  }

  // 4. Assemble system and user prompts
  const assembledPrompt = buildPrompt(validationResult.data);

  // 5. Stream response via LLM service
  try {
    const tokenStream = await streamCompletion({
      system: assembledPrompt.system,
      user: assembledPrompt.user,
      signal: req.signal,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const token of tokenStream) {
            if (req.signal.aborted) {
              break;
            }
            controller.enqueue(encoder.encode(token));
          }
          controller.close();
        } catch (streamError) {
          if (streamError instanceof LLMAbortError || req.signal.aborted) {
            controller.close();
            return;
          }
          controller.error(streamError);
        }
      },
      cancel() {
        // Handled via AbortSignal
      },
    });

    return new Response(readableStream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
        "X-RateLimit-Limit": String(rateLimit.limit),
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Reset": String(rateLimit.resetAt),
      },
    });
  } catch (error: unknown) {
    if (error instanceof LLMAbortError || req.signal.aborted) {
      return new Response("Generation cancelled by client", { status: 499 });
    }

    if (error instanceof LLMError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred while generating the implementation plan.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
