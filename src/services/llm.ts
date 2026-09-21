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
  constructor(message = "Invalid or missing OpenRouter API key. Please check your server configuration.") {
    super(message, 401, "UNAUTHORIZED");
    this.name = "LLMAuthenticationError";
    Object.setPrototypeOf(this, LLMAuthenticationError.prototype);
  }
}

export class LLMQuotaError extends LLMError {
  constructor(message = "Insufficient OpenRouter account credits. Please check your account balance.") {
    super(message, 402, "INSUFFICIENT_CREDITS");
    this.name = "LLMQuotaError";
    Object.setPrototypeOf(this, LLMQuotaError.prototype);
  }
}

export class LLMRateLimitError extends LLMError {
  constructor(message = "OpenRouter rate limit exceeded. Please wait a moment before trying again.") {
    super(message, 429, "RATE_LIMITED");
    this.name = "LLMRateLimitError";
    Object.setPrototypeOf(this, LLMRateLimitError.prototype);
  }
}

export class LLMProviderError extends LLMError {
  constructor(message = "The AI provider service is currently unavailable. Please try again later.") {
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

  const err = error as { status?: number; statusCode?: number; message?: string };
  const status = err.status || err.statusCode;

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
 * Streams completion tokens from OpenRouter using a provider-agnostic interface.
 */
export async function streamCompletion(
  options: StreamCompletionOptions
): Promise<AsyncIterable<string>> {
  const env = getServerEnv();

  const client = new OpenAI({
    baseURL: env.OPENROUTER_BASE_URL,
    apiKey: env.OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": env.APP_URL,
      "X-Title": env.APP_NAME,
    },
  });

  try {
    const stream = await client.chat.completions.create(
      {
        model: env.OPENROUTER_MODEL,
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

    async function* generateTokens(): AsyncGenerator<string, void, unknown> {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) {
          yield text;
        }
      }
    }

    return generateTokens();
  } catch (error: unknown) {
    throw mapProviderError(error, options.signal);
  }
}
