import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const heroSource = readFileSync(new URL("./ui/glowy-waves-hero-shadcnui.tsx", import.meta.url), "utf8");
const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Hero Explore cue", () => {
  it("uses a compact accordion-style chevron and removes the former line-and-arrow structure", () => {
    expect(heroSource).toContain('import { ArrowRight, ChevronDown } from "lucide-react";');
    expect(heroSource).toContain('<span>Explore</span><ChevronDown aria-hidden="true" />');
    expect(heroSource).not.toContain("ArrowDown");
    expect(heroSource).not.toContain('<i aria-hidden="true" />');
  });

  it("smoothly navigates the Explore cue to the Credibility Bridge while honoring reduced-motion preferences", () => {
    expect(heroSource).toContain('const credibilitySection = document.getElementById("credibility");');
    expect(heroSource).toContain('behavior: prefersReducedMotion ? "auto" : "smooth", block: "start"');
    expect(heroSource).toContain('window.matchMedia("(prefers-reduced-motion: reduce)").matches');
    expect(heroSource).toContain('window.history.pushState(null, "", "#credibility");');
    expect(heroSource).toContain('href="#credibility" className="gws-glowy-explore" onClick={handleExploreClick}');
  });

  it("keeps the Explore cue outside the scroll-linked narrative layer so it remains visible during hero parallax", () => {
    expect(heroSource).toContain('<div data-parallax-layer="4" className="gws-glowy-narrative">');
    expect(heroSource).not.toContain('<div data-parallax-layer="4" className="gws-glowy-content">');
    expect(pageStyles).toContain(".gws-glowy-narrative { width:100%; will-change:transform; }");
    expect(pageStyles).toContain("@media (prefers-reduced-motion:reduce) { .gws-glowy-narrative { transform:none !important; will-change:auto; } }");
  });

  it("keeps the hero canvas flush to the hero bounds", () => {
    expect(pageStyles).toContain(".gws-glowy-canvas { inset:0; width:100%; height:100%; }");
  });

  it("uses centered normal flow to maintain the 120px gap and lower-edge clearance for the vertically stacked Explore cue", () => {
    expect(pageStyles).toContain(".gws-glowy-explore { position:static; margin-top:var(--gws-hero-flow-explore-gap); }");
    expect(pageStyles).toContain(".gws-glowy-actions { margin-bottom:50px; }");
    expect(pageStyles).toContain("--gws-hero-flow-explore-gap:120px;");
    expect(pageStyles).toContain("--gws-hero-explore-bottom-clearance:35px;");
    expect(pageStyles).toContain(".gws-glowy-content { flex-direction:column; align-items:center; justify-content:flex-end; padding-bottom:var(--gws-hero-explore-bottom-clearance); }");
    expect(pageStyles).toContain(".gws-glowy-content-inner { width:min(100%,850px); margin-top:40px; }");
    expect(pageStyles).not.toContain(".gws-glowy-explore i { width:1px;");
    expect(pageStyles).toContain("@media (max-width:760px) { .gws-glowy-content { padding-bottom:var(--gws-hero-explore-bottom-clearance); } }");
  });

  it("keeps the Credibility Bridge below the desktop opening viewport", () => {
    expect(pageStyles).toContain("@media (min-width:761px) { .gws-glowy-hero,.gws-glowy-parallax-layers,.gws-glowy-content { height:calc(100svh - var(--gws-fixed-header-offset)); min-height:0; } }");
  });
});
