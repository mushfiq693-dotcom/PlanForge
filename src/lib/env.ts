import { z } from "zod";

export const serverEnvSchema = z.object({
  OPENROUTER_API_KEY: z
    .string({
      error: "OPENROUTER_API_KEY is required in server environment.",
    })
    .min(1, "OPENROUTER_API_KEY cannot be empty."),
  OPENROUTER_MODEL: z
    .string()
    .min(1, "OPENROUTER_MODEL cannot be empty.")
    .default("openrouter/free"),
  OPENROUTER_BASE_URL: z
    .string()
    .url("OPENROUTER_BASE_URL must be a valid URL.")
    .default("https://openrouter.ai/api/v1"),
  APP_URL: z
    .string()
    .url("APP_URL must be a valid URL.")
    .default("http://localhost:3000"),
  APP_NAME: z
    .string()
    .min(1, "APP_NAME cannot be empty.")
    .default("PlanForge"),
  RATE_LIMIT_MAX: z.coerce
    .number()
    .int()
    .positive("RATE_LIMIT_MAX must be a positive integer.")
    .default(5),
  RATE_LIMIT_WINDOW_MINUTES: z.coerce
    .number()
    .int()
    .positive("RATE_LIMIT_WINDOW_MINUTES must be a positive integer.")
    .default(10),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedEnv: ServerEnv | null = null;

/**
 * Validates raw environment records against the serverEnvSchema.
 */
export function validateServerEnv(
  rawEnv: Record<string, unknown> = process.env
): ServerEnv {
  const result = serverEnvSchema.safeParse({
    OPENROUTER_API_KEY: rawEnv.OPENROUTER_API_KEY,
    OPENROUTER_MODEL: rawEnv.OPENROUTER_MODEL,
    OPENROUTER_BASE_URL: rawEnv.OPENROUTER_BASE_URL,
    APP_URL: rawEnv.APP_URL,
    APP_NAME: rawEnv.APP_NAME,
    RATE_LIMIT_MAX: rawEnv.RATE_LIMIT_MAX,
    RATE_LIMIT_WINDOW_MINUTES: rawEnv.RATE_LIMIT_WINDOW_MINUTES,
  });

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    const message = `Server environment configuration error:\n${errorDetails}\nPlease verify your .env.local file.`;
    throw new Error(message);
  }

  return result.data;
}

/**
 * Validates and retrieves server environment variables.
 * In development, reads fresh process.env so edits to .env.local apply immediately.
 */
export function getServerEnv(): ServerEnv {
  if (process.env.NODE_ENV !== "production") {
    return validateServerEnv(process.env);
  }

  if (cachedEnv) {
    return cachedEnv;
  }

  cachedEnv = validateServerEnv(process.env);
  return cachedEnv;
}

/**
 * Resets cached env (used in test suites).
 */
export function resetServerEnvCache(): void {
  cachedEnv = null;
}
