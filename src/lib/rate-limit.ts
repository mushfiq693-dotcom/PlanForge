interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

/**
 * In-memory sliding window rate limiter per client identifier (e.g. IP).
 * Cleanly abstracted so it can be swapped with Upstash Redis or similar KV store.
 */
export function checkRateLimit(
  identifier: string,
  limit: number,
  windowMinutes: number
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;

  const record = rateLimitStore.get(identifier);

  // If no record exists or window expired, start a new window
  if (!record || now >= record.resetAt) {
    const resetAt = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetAt });
    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - 1),
      resetAt,
    };
  }

  // If within window and over limit
  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }

  // Increment count
  record.count += 1;
  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - record.count),
    resetAt: record.resetAt,
  };
}

/**
 * Resets rate limit store (used in test suites).
 */
export function resetRateLimitStore(): void {
  rateLimitStore.clear();
}
