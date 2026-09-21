import { describe, it, expect } from "vitest";
import {
  mapProviderError,
  LLMAuthenticationError,
  LLMQuotaError,
  LLMRateLimitError,
  LLMProviderError,
  LLMAbortError,
  LLMError,
} from "./llm";

describe("LLM Service Error Mapping", () => {
  it("maps 401 status to LLMAuthenticationError", () => {
    const error = { status: 401, message: "Unauthorized API key" };
    const mapped = mapProviderError(error);
    expect(mapped).toBeInstanceOf(LLMAuthenticationError);
    expect(mapped.statusCode).toBe(401);
    expect(mapped.code).toBe("UNAUTHORIZED");
    expect(mapped.message).not.toContain("Unauthorized API key"); // Doesn't leak raw provider message
  });

  it("maps 402 status to LLMQuotaError", () => {
    const error = { status: 402, message: "No credits left" };
    const mapped = mapProviderError(error);
    expect(mapped).toBeInstanceOf(LLMQuotaError);
    expect(mapped.statusCode).toBe(402);
    expect(mapped.code).toBe("INSUFFICIENT_CREDITS");
  });

  it("maps 429 status to LLMRateLimitError", () => {
    const error = { status: 429, message: "Too many requests" };
    const mapped = mapProviderError(error);
    expect(mapped).toBeInstanceOf(LLMRateLimitError);
    expect(mapped.statusCode).toBe(429);
    expect(mapped.code).toBe("RATE_LIMITED");
  });

  it("maps 500, 502, 503 to LLMProviderError", () => {
    const error500 = { status: 500 };
    const error502 = { status: 502 };
    const error503 = { status: 503 };

    expect(mapProviderError(error500)).toBeInstanceOf(LLMProviderError);
    expect(mapProviderError(error502)).toBeInstanceOf(LLMProviderError);
    expect(mapProviderError(error503)).toBeInstanceOf(LLMProviderError);
    expect(mapProviderError(error502).statusCode).toBe(502);
  });

  it("maps aborted signal to LLMAbortError", () => {
    const abortController = new AbortController();
    abortController.abort();

    const mapped = mapProviderError(new Error("aborted"), abortController.signal);
    expect(mapped).toBeInstanceOf(LLMAbortError);
    expect(mapped.statusCode).toBe(499);
  });

  it("passes through existing LLMError instances unchanged", () => {
    const customError = new LLMError("Custom issue", 400, "BAD_REQUEST");
    const mapped = mapProviderError(customError);
    expect(mapped).toBe(customError);
  });
});
