import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const revenueHost = readFileSync(new URL("./RevenueInfrastructurePlugAndPlayHost.tsx", import.meta.url), "utf8");
const revenuePackageStyles = readFileSync(new URL("./revenue-infrastructure-package/index.css", import.meta.url), "utf8");
const buyerJourneyHost = readFileSync(new URL("./BuyerJourneyPlugAndPlayHost.tsx", import.meta.url), "utf8");
const buyerJourneyPackage = readFileSync(new URL("./buyer-journey-package/App.tsx", import.meta.url), "utf8");

describe("Homepage section padding system", () => {
  it("defines shared desktop and mobile vertical-padding tokens", () => {
    expect(pageStyles).toContain("--gws-section-space:112px;");
    expect(pageStyles).toContain("--gws-section-space-mobile:72px;");
    expect(pageStyles).toContain(".section,.homepage-visual-section { padding-block:var(--gws-section-space); }");
    expect(pageStyles).toContain(".section,.homepage-visual-section { padding-block:var(--gws-section-space-mobile); }");
  });

  it("applies the shared rhythm to the hero, credibility bridge, and diagnostic close", () => {
    expect(pageStyles).toContain(".gws-glowy-content { z-index:3; min-height:790px; padding:var(--gws-section-space) 24px;");
    expect(pageStyles).toContain(".credibility-bridge { position:relative; z-index:2; margin-top:-46px; padding-block:var(--gws-section-space);");
    expect(pageStyles).toContain(".diagnostic-section { padding-block:var(--gws-section-space);");
  });

  it("uses scoped visual-package boundary adjustments without changing their internal compositions", () => {
    expect(homeSource).toContain("<RevenueInfrastructurePlugAndPlayHost />");
    expect(homeSource).not.toContain('id="revenue-infrastructure" className="homepage-visual-section"');
    expect(revenueHost).toContain('id="revenue-infrastructure"');
    expect(revenueHost).toContain('className="homepage-visual-section gws-page"');
    expect(homeSource).toContain("<BuyerJourneyPlugAndPlayHost />");
    expect(homeSource).not.toContain('id="ai-visibility" className="homepage-visual-section"');
    expect(revenuePackageStyles).toContain("padding: 0px 40px;");
    expect(buyerJourneyPackage).toContain('<section id="ai-visibility-homepage-visual-section" className="min-h-screen flex flex-col"');
    expect(buyerJourneyHost).toContain("const sectionSpacingStyles");
    expect(buyerJourneyHost).toContain("padding: 112px 0px !important;");
    expect(buyerJourneyHost).toContain("padding: 72px 0px !important;");
    expect(buyerJourneyHost).toContain("padding: 0px 0px !important;");
  });
});
