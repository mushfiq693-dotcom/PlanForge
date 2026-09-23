import OpenAI from "openai";
import { getServerEnv } from "@/lib/env";

export class LLMError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(message: string, statusCode = 500, code = "LLM_ERROR") {
    super(message);
    this.name = "LLMError";
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, LLMError.prototype);
  }
}

export class LLMAuthenticationError extends LLMError {
  constructor(message = "Invalid or missing OpenRouter API key. Please check your server or Vercel configuration.") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "LLMAuthenticationError";
    Object.setPrototypeOf(this, LLMAuthenticationError.prototype);
  }
}

export class LLMQuotaError extends LLMError {
  constructor(message = "Insufficient OpenRouter account credits. Switch OPENROUTER_MODEL to 'openrouter/free' or top up your account.") {
    super(message, 402, "INSUFFICIENT_CREDITS");
    this.name = "LLMQuotaError";
    Object.setPrototypeOf(this, LLMQuotaError.prototype);
  }
}

export class LLMRateLimitError extends LLMError {
  constructor(message = "OpenRouter rate limit reached or free tier model is busy. Please wait a few moments and try again.") {
    super(message, 429, "RATE_LIMITED");
    this.name = "LLMRateLimitError";
    Object.setPrototypeOf(this, LLMRateLimitError.prototype);
  }
}

export class LLMProviderError extends LLMError {
  constructor(message = "The AI provider service is currently unavailable or timed out. Please try again.") {
    super(message, 502, "PROVIDER_UNAVAILABLE");
    this.name = "LLMProviderError";
    Object.setPrototypeOf(this, LLMProviderError.prototype);
  }
}

export class LLMAbortError extends LLMError {
  constructor(message = "Plan generation was cancelled.") {
    super(message, 499, "CLIENT_ABORTED");
    this.name = "LLMAbortError";
    Object.setPrototypeOf(this, LLMAbortError.prototype);
  }
}

export interface StreamCompletionOptions {
  system: string;
  user: string;
  signal?: AbortSignal;
}

/**
 * Maps arbitrary provider errors to user-safe, typed LLMError instances.
 * Guarantees that raw credentials or sensitive payload internals are NEVER leaked.
 */
export function mapProviderError(error: unknown, signal?: AbortSignal): LLMError {
  if (error instanceof LLMError) {
    return error;
  }

  if (signal?.aborted || (error instanceof Error && error.name === "AbortError")) {
    return new LLMAbortError();
  }

  const err = error as { status?: number; statusCode?: number; message?: string; code?: string };
  const status = err.status || err.statusCode;

  if (err.code === "ETIMEDOUT" || err.message?.toLowerCase().includes("timeout")) {
    return new LLMProviderError("The AI provider timed out. Free models may be experiencing queue delays. Please retry.");
  }

  switch (status) {
    case 401:
      return new LLMAuthenticationError();
    case 402:
      return new LLMQuotaError();
    case 429:
      return new LLMRateLimitError();
    case 500:
    case 502:
    case 503:
    case 504:
      return new LLMProviderError();
    default:
      return new LLMError("An unexpected error occurred while communicating with the AI service.", 500);
  }
}

/**
 * Reliable fallback models to try if the primary model fails or stalls.
 */
const FALLBACK_MODELS = [
  "openrouter/free",
  "inclusionai/ling-3.0-flash-fin:free",
  "nex-agi/nex-n2.5-mini:free",
];

/**
 * Streams completion tokens from OpenRouter using a resilient multi-model fallback pipeline.
 */
export async function streamCompletion(
  options: StreamCompletionOptions
): Promise<AsyncIterable<string>> {
  const env = getServerEnv();

  const client = new OpenAI({
    baseURL: env.OPENROUTER_BASE_URL,
    apiKey: env.OPENROUTER_API_KEY,
    timeout: 45000, // 45 seconds timeout per request attempt
    maxRetries: 2,
    defaultHeaders: {
      "HTTP-Referer": env.APP_URL,
      "X-Title": env.APP_NAME,
    },
  });

  const candidateModels = Array.from(
    new Set([env.OPENROUTER_MODEL, ...FALLBACK_MODELS])
  ).filter(Boolean);

  let stream: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk> | null = null;
  let lastError: unknown = null;

  for (const model of candidateModels) {
    if (options.signal?.aborted) {
      throw new LLMAbortError();
    }

    try {
      stream = await client.chat.completions.create(
        {
          model,
          messages: [
            { role: "system", content: options.system },
            { role: "user", content: options.user },
          ],
          stream: true,
        },
        {
          signal: options.signal,
        }
      );

      // Successfully initiated stream with this candidate model
      break;
    } catch (modelError: unknown) {
      lastError = modelError;
      if (options.signal?.aborted) {
        throw new LLMAbortError();
      }
      // Continue to next candidate model in the chain
    }
  }

  if (!stream) {
    throw mapProviderError(lastError, options.signal);
  }

  async function* generateTokens(): AsyncGenerator<string, void, unknown> {
    for await (const chunk of stream!) {
      if (options.signal?.aborted) {
        break;
      }
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) {
        yield text;
      }
    }
  }

  return generateTokens();
}
