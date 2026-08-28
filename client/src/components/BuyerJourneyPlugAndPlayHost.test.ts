import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const hostSource = readFileSync(new URL("./BuyerJourneyPlugAndPlayHost.tsx", import.meta.url), "utf8");
const packageSource = readFileSync(new URL("./buyer-journey-package/App.tsx", import.meta.url), "utf8");
const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Buyer Journey plug-and-play integration", () => {
  it("replaces the prior AI Visibility visual with the isolated Buyer Journey host", () => {
    expect(homeSource).toContain("BuyerJourneyPlugAndPlayHost");
    expect(homeSource).not.toContain("BuyerJourneyFull");
    expect(hostSource).toContain("attachShadow");
    expect(hostSource).toContain("PackageApp");
    expect(hostSource).toContain("width: min(calc(100% - 96px), 1120px);");
    expect(hostSource).toContain('font-family: "DM Serif Display", Georgia, serif !important;');
    expect(hostSource).toContain("border-radius: 0 !important;");
    expect(hostSource).toContain("GwsParticleDrift");
  });

  it("preserves the supplied buyer journey structure while using neutral evaluation indicators", () => {
    expect(packageSource).toContain("AI is moving the decision");
    expect(packageSource).toContain("AI-Assisted Discovery");
    expect(packageSource).toContain("Evaluated criteria");
    expect(packageSource).toContain("Source Signals");
    expect(packageSource).not.toContain("Real Reviews");
    expect(packageSource).not.toContain("stars:");
  });

  it("promotes the supplied Buyer Journey root to the AI Visibility section without an enclosing homepage wrapper", () => {
    expect(homeSource).toContain("<BuyerJourneyPlugAndPlayHost />");
    expect(homeSource).not.toContain('id="ai-visibility" className="homepage-visual-section"');
    expect(packageSource).toContain('<section id="ai-visibility-homepage-visual-section" className="min-h-screen flex flex-col"');
    expect(packageSource).toContain("</section>");
    expect(hostSource).toContain("#ai-visibility-homepage-visual-section {");
    expect(hostSource).toContain("border-top: 1px solid #D8D5CE;");
    expect(hostSource).toContain("padding: 112px 0px !important;");
    expect(hostSource).toContain("padding: 72px 0px !important;");
    expect(hostSource).toContain(".min-h-screen.flex.flex-col {");
    expect(hostSource).toContain("padding: 0px 0px !important;");
  });

  it("uses italic DM Serif Display for italicized Buyer Journey emphasis without changing package colors", () => {
    expect(hostSource).toContain(".min-h-screen em {");
    expect(hostSource).toContain('font-family: "DM Serif Display", Georgia, serif !important;');
    expect(hostSource).toContain("font-style: italic !important;");
    expect(packageSource).toContain("color: C.gold");
  });

  it("adds a black, GWS-branded Particle Drift background at the host layer without changing the package root", () => {
    expect(hostSource).toContain('className="gws-ai-visibility-particle-stage"');
    expect(hostSource).toContain("background: #000000;");
    expect(hostSource).toContain(".gws-ai-visibility-particle-canvas {");
    expect(hostSource).toContain("pointer-events: none;");
    expect(hostSource).toContain("background: transparent !important;");
    expect(hostSource).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
