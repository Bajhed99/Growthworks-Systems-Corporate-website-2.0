import { describe, expect, it } from "vitest";

import { HERO_PARALLAX_LAYERS } from "./heroParallax";

describe("HERO_PARALLAX_LAYERS", () => {
  it("defines the four ordered layers from the supplied ScrollTrigger pattern", () => {
    expect(HERO_PARALLAX_LAYERS.map(({ layer }) => layer)).toEqual(["1", "2", "3", "4"]);
  });

  it("increases visual-image depth while keeping content movement restrained", () => {
    expect(HERO_PARALLAX_LAYERS.map(({ yPercent }) => yPercent)).toEqual([70, 82, 56, 10]);
    expect(HERO_PARALLAX_LAYERS[1].scale).toBe(1.08);
    expect(HERO_PARALLAX_LAYERS[2].scale).toBe(1.12);
  });

  it("keeps image depth dominant while the foreground content remains restrained", () => {
    const speeds = HERO_PARALLAX_LAYERS.map(({ yPercent }) => yPercent);
    expect(speeds[1]).toBeGreaterThan(speeds[0]);
    expect(speeds[2]).toBeLessThan(speeds[1]);
    expect(speeds[3]).toBeLessThan(speeds[2]);
  });
});
