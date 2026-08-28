import { describe, expect, it } from "vitest";

import { getPageParallaxTravel, PAGE_PARALLAX_SCROLL_TRIGGER, PAGE_TEXT_REVEAL_TRIGGER } from "./pageParallax";

describe("page parallax configuration", () => {
  it("uses the full viewport passage without modifying native scrolling", () => {
    expect(PAGE_PARALLAX_SCROLL_TRIGGER).toEqual({ start: "top bottom", end: "bottom top" });
  });

  it("derives a restrained transform-only travel range", () => {
    expect(getPageParallaxTravel(24)).toEqual({ fromY: -12, toY: 24 });
    expect(getPageParallaxTravel(-28)).toEqual({ fromY: 14, toY: -28 });
  });

  it("uses a once-only text reveal after content enters the viewport", () => {
    expect(PAGE_TEXT_REVEAL_TRIGGER).toEqual({ start: "top 84%", once: true });
  });
});
