import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkRateLimit, resetRateLimitStore } from "./rate-limit";

describe("Rate Limiter Module", () => {
  beforeEach(() => {
    resetRateLimitStore();
    vi.useRealTimers();
  });

  it("allows initial request and initializes window", () => {
    const ip = "192.168.1.100";
    const result = checkRateLimit(ip, 5, 10);

    expect(result.success).toBe(true);
    expect(result.limit).toBe(5);
    expect(result.remaining).toBe(4);
    expect(result.resetAt).toBeGreaterThan(Date.now());
  });

  it("accurately decrements remaining allowance on successive requests", () => {
    const ip = "192.168.1.101";

    expect(checkRateLimit(ip, 5, 10).remaining).toBe(4);
    expect(checkRateLimit(ip, 5, 10).remaining).toBe(3);
    expect(checkRateLimit(ip, 5, 10).remaining).toBe(2);
    expect(checkRateLimit(ip, 5, 10).remaining).toBe(1);
    expect(checkRateLimit(ip, 5, 10).remaining).toBe(0);
  });

  it("blocks the 6th request within a 5-request window", () => {
    const ip = "192.168.1.102";

    // 5 allowed requests
    for (let i = 0; i < 5; i++) {
      const res = checkRateLimit(ip, 5, 10);
      expect(res.success).toBe(true);
    }

    // 6th request must fail
    const blocked = checkRateLimit(ip, 5, 10);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("maintains isolated rate limit buckets for different IP addresses", () => {
    const ip1 = "10.0.0.1";
    const ip2 = "10.0.0.2";

    // Exhaust ip1 limit
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip1, 5, 10);
    }

    expect(checkRateLimit(ip1, 5, 10).success).toBe(false);

    // ip2 should still have full quota
    const resIp2 = checkRateLimit(ip2, 5, 10);
    expect(resIp2.success).toBe(true);
    expect(resIp2.remaining).toBe(4);
  });

  it("resets quota after window expires", () => {
    vi.useFakeTimers();
    const ip = "192.168.1.103";
    const windowMinutes = 10;

    // Use all 5 requests
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip, 5, windowMinutes);
    }

    expect(checkRateLimit(ip, 5, windowMinutes).success).toBe(false);

    // Advance time past window duration (10 mins + 1 sec)
    vi.advanceTimersByTime(10 * 60 * 1000 + 1000);

    // New request after window expiration should succeed
    const freshResult = checkRateLimit(ip, 5, windowMinutes);
    expect(freshResult.success).toBe(true);
    expect(freshResult.remaining).toBe(4);
  });
});
