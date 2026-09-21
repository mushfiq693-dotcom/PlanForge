import { describe, it, expect } from "vitest";
import { sanitizeFilename } from "./download";

describe("sanitizeFilename", () => {
  it("returns default IMPLEMENTATION_PLAN.md for empty/null inputs", () => {
    expect(sanitizeFilename("")).toBe("IMPLEMENTATION_PLAN.md");
    expect(sanitizeFilename(null)).toBe("IMPLEMENTATION_PLAN.md");
    expect(sanitizeFilename(undefined)).toBe("IMPLEMENTATION_PLAN.md");
    expect(sanitizeFilename("   ")).toBe("IMPLEMENTATION_PLAN.md");
  });

  it("converts project names to uppercase formatted filenames", () => {
    expect(sanitizeFilename("SnapVault")).toBe("SNAPVAULT_IMPLEMENTATION_PLAN.md");
    expect(sanitizeFilename("MedCards Pro")).toBe("MEDCARDS-PRO_IMPLEMENTATION_PLAN.md");
  });

  it("cleans special symbols, spaces, and punctuation", () => {
    expect(sanitizeFilename("My App! @2026 // SaaS")).toBe("MY-APP-2026-SAAS_IMPLEMENTATION_PLAN.md");
    expect(sanitizeFilename("---leading-and-trailing---")).toBe("LEADING-AND-TRAILING_IMPLEMENTATION_PLAN.md");
  });
});
