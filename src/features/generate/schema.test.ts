import { describe, it, expect } from "vitest";
import { generatePlanRequestSchema } from "./schema";

describe("generatePlanRequestSchema", () => {
  it("validates a minimal valid request with idea >= 30 characters", () => {
    const validData = {
      idea: "A SaaS tool for automated database backups and Slack notifications.",
    };

    const result = generatePlanRequestSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.idea).toBe(validData.idea);
    }
  });

  it("validates a complete request with all optional fields", () => {
    const fullData = {
      idea: "A SaaS tool for automated database backups with one-click restore and alerting.",
      name: "SnapVault",
      targetUsers: "Indie hackers and startup CTOs",
      stack: "Next.js, PostgreSQL, Tailwind",
      level: "intermediate" as const,
      timeline: "weekend" as const,
      mustHave: "Automated daily cron backups",
      outOfScope: "Enterprise SSO and multi-tenant billing",
    };

    const result = generatePlanRequestSchema.safeParse(fullData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("SnapVault");
      expect(result.data.level).toBe("intermediate");
      expect(result.data.timeline).toBe("weekend");
    }
  });

  it("rejects idea shorter than 30 characters", () => {
    const shortData = {
      idea: "Too short idea",
    };

    const result = generatePlanRequestSchema.safeParse(shortData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 30 characters");
    }
  });

  it("rejects idea longer than 6000 characters", () => {
    const hugeData = {
      idea: "a".repeat(6001),
    };

    const result = generatePlanRequestSchema.safeParse(hugeData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("cannot exceed 6,000 characters");
    }
  });

  it("rejects invalid experience level or timeline enums", () => {
    const invalidEnums = {
      idea: "A valid length idea describing a complex software application.",
      level: "expert",
      timeline: "6_months",
    };

    const result = generatePlanRequestSchema.safeParse(invalidEnums);
    expect(result.success).toBe(false);
  });

  it("allows empty string or null for optional fields", () => {
    const emptyOptionals = {
      idea: "A valid length idea describing a complex software application.",
      name: "",
      targetUsers: null,
      stack: "",
      level: null,
      timeline: "",
      mustHave: null,
      outOfScope: "",
    };

    const result = generatePlanRequestSchema.safeParse(emptyOptionals);
    expect(result.success).toBe(true);
  });
});
