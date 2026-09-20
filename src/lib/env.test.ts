import { describe, it, expect, beforeEach } from "vitest";
import { getServerEnv, validateServerEnv, resetServerEnvCache } from "./env";

describe("env validation module", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    resetServerEnvCache();
    process.env = { ...originalEnv };
  });

  it("throws a clear error when OPENROUTER_API_KEY is missing", () => {
    delete process.env.OPENROUTER_API_KEY;
    expect(() => getServerEnv()).toThrowError(
      /OPENROUTER_API_KEY is required in server environment/
    );
  });

  it("validates valid environment variables with default values", () => {
    const raw = {
      OPENROUTER_API_KEY: "sk-or-v1-test-key",
    };

    const env = validateServerEnv(raw);
    expect(env.OPENROUTER_API_KEY).toBe("sk-or-v1-test-key");
    expect(env.OPENROUTER_MODEL).toBe("anthropic/claude-3.7-sonnet");
    expect(env.OPENROUTER_BASE_URL).toBe("https://openrouter.ai/api/v1");
    expect(env.APP_NAME).toBe("PlanForge");
    expect(env.RATE_LIMIT_MAX).toBe(5);
    expect(env.RATE_LIMIT_WINDOW_MINUTES).toBe(10);
  });

  it("accepts custom model, URL, and rate limit settings", () => {
    const raw = {
      OPENROUTER_API_KEY: "sk-or-v1-test-key",
      OPENROUTER_MODEL: "google/gemini-2.5-pro",
      OPENROUTER_BASE_URL: "https://openrouter.ai/api/v1",
      APP_URL: "https://myplanforge.app",
      APP_NAME: "CustomPlanForge",
      RATE_LIMIT_MAX: "25",
      RATE_LIMIT_WINDOW_MINUTES: "15",
    };

    const env = validateServerEnv(raw);
    expect(env.OPENROUTER_MODEL).toBe("google/gemini-2.5-pro");
    expect(env.APP_URL).toBe("https://myplanforge.app");
    expect(env.APP_NAME).toBe("CustomPlanForge");
    expect(env.RATE_LIMIT_MAX).toBe(25);
    expect(env.RATE_LIMIT_WINDOW_MINUTES).toBe(15);
  });

  it("fails fast with invalid URL format", () => {
    const raw = {
      OPENROUTER_API_KEY: "sk-or-v1-test-key",
      OPENROUTER_BASE_URL: "invalid-url",
    };

    expect(() => validateServerEnv(raw)).toThrowError(
      /OPENROUTER_BASE_URL must be a valid URL/
    );
  });
});
