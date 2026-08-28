import { describe, expect, it } from "vitest";

import { shouldCompactStickyHeader, STICKY_HEADER_COMPACT_THRESHOLD } from "./stickyHeader";

describe("shouldCompactStickyHeader", () => {
  it("preserves the full header at or before the threshold", () => {
    expect(shouldCompactStickyHeader(0)).toBe(false);
    expect(shouldCompactStickyHeader(STICKY_HEADER_COMPACT_THRESHOLD)).toBe(false);
  });

  it("activates the compact header state after the threshold", () => {
    expect(shouldCompactStickyHeader(STICKY_HEADER_COMPACT_THRESHOLD + 1)).toBe(true);
  });
});
