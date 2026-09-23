import { describe, it, expect } from "vitest";
import {
  ANTI_SLOP_RULES,
  ANTI_SLOP_BLACKLIST_MARKDOWN,
  ANTI_SLOP_START_MARKER,
  ANTI_SLOP_END_MARKER,
  AntiSlopCategory,
} from "./anti-slop";

describe("anti-slop", () => {
  it("exports exactly 36 rules", () => {
    expect(ANTI_SLOP_RULES).toHaveLength(36);
  });

  it("contains unique sequential rule IDs from 1 to 36", () => {
    const ids = ANTI_SLOP_RULES.map((r) => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(36);

    for (let i = 1; i <= 36; i++) {
      expect(ids).toContain(i);
    }
  });

  it("ensures every category is populated and non-empty", () => {
    const expectedCategories: AntiSlopCategory[] = [
      "Visual",
      "Layout",
      "Iconography and glyphs",
      "Typography",
      "Copy",
      "Behavior and completeness",
    ];

    for (const cat of expectedCategories) {
      const matching = ANTI_SLOP_RULES.filter((r) => r.category === cat);
      expect(matching.length).toBeGreaterThan(0);
      for (const item of matching) {
        expect(item.rule.trim().length).toBeGreaterThan(10);
      }
    }
  });

  it("renders ANTI_SLOP_BLACKLIST_MARKDOWN with start and end markers", () => {
    expect(ANTI_SLOP_BLACKLIST_MARKDOWN.startsWith(ANTI_SLOP_START_MARKER)).toBe(true);
    expect(ANTI_SLOP_BLACKLIST_MARKDOWN.endsWith(ANTI_SLOP_END_MARKER)).toBe(true);
  });

  it("contains all 36 rules in the markdown export", () => {
    for (const rule of ANTI_SLOP_RULES) {
      expect(ANTI_SLOP_BLACKLIST_MARKDOWN).toContain(`${rule.id}. ${rule.rule}`);
    }
  });
});
