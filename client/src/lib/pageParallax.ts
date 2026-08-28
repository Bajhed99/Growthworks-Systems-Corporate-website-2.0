export const PAGE_PARALLAX_SCROLL_TRIGGER = {
  start: "top bottom",
  end: "bottom top",
} as const;

export const PAGE_TEXT_REVEAL_TRIGGER = {
  start: "top 84%",
  once: true,
} as const;

export function getPageParallaxTravel(shift: number) {
  return {
    fromY: Math.round(-shift / 2),
    toY: shift,
  };
}
