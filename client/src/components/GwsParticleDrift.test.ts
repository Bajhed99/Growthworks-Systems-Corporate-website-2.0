import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const particleSource = readFileSync(new URL("./GwsParticleDrift.tsx", import.meta.url), "utf8");

describe("GWS Particle Drift", () => {
  it("uses the approved GWS Crimson and Warm Cream colors in the canvas treatment", () => {
    expect(particleSource).toContain('const GWS_CRIMSON = "132, 22, 23";');
    expect(particleSource).toContain('const GWS_CREAM = "248, 246, 236";');
    expect(particleSource).toContain("rgba(${GWS_CRIMSON},");
  });

  it("keeps the drift interactive without blocking package interactions", () => {
    expect(particleSource).toContain('window.addEventListener("pointermove", onPointerMove, { passive: true });');
    expect(particleSource).toContain('className="gws-ai-visibility-particle-canvas"');
  });

  it("stops animation and reduces visual motion for users who prefer reduced motion", () => {
    expect(particleSource).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
    expect(particleSource).toContain("if (!motionQuery.matches) frameId = window.requestAnimationFrame(draw);");
    expect(particleSource).toContain('motionQuery.addEventListener("change", onMotionChange);');
  });
});
