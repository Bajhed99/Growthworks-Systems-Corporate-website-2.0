import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Credibility Bridge refinement", () => {
  it("uses the requested black surface with a Crimson bracket-lined Experience-first kicker", () => {
    expect(pageStyles).toContain("background:#000000; color:#F8F6EC;");
    expect(pageStyles).toContain(".credibility-bridge .section-kicker { color:var(--gws-crimson); }");
    expect(pageStyles).toContain(".credibility-bridge .section-kicker span { display:block; width:27px; height:1px; background:currentColor; }");
    expect(homeSource).toContain('<p className="section-kicker"><span aria-hidden="true" />Experience first. Prescription second<span aria-hidden="true" /></p>');
  });

  it("uses a card-free three-column proof layout with compact one-line 30px white headings", () => {
    expect(pageStyles).toContain(".credibility-bridge .credibility-panel { max-width:1120px; grid-template-columns:repeat(3,minmax(0,1fr)); gap:30px; margin:50px auto 0; background:transparent; text-align:center; }");
    expect(pageStyles).toContain(".credibility-bridge .credibility-panel > .credibility-proof { min-height:0; border:0 !important; background:transparent; padding:0; box-shadow:none !important; }");
    expect(pageStyles).toContain('font-family:"DM Serif Display",Georgia,serif; font-size:30px;');
    expect(pageStyles).toContain(".credibility-bridge .credibility-panel dt { color:#FFFFFF; }");
    expect(pageStyles).toContain("margin:0 0 30px;");
    expect(pageStyles).toContain("white-space:nowrap;");
    expect(pageStyles).toContain(".credibility-bridge .credibility-panel dd { max-width:290px; margin:0 auto; color:#F8F6EC; font-size:18px;");
    expect(pageStyles).toContain("@media (max-width:760px) { .credibility-bridge .credibility-panel > .credibility-proof { display:block; grid-template-columns:none; column-gap:0; text-align:center; } }");
    expect(homeSource).toContain("<dt>30+ years</dt>");
    expect(homeSource).toContain("<dt>Diagnose First</dt>");
    expect(homeSource).toContain("<dt>Measure Outcomes</dt>");
  });

  it("uses governed mobile type sizes for readable kicker, proof labels, and supporting copy", () => {
    expect(pageStyles).toContain("@media (max-width:760px) { .credibility-bridge .section-kicker { font-size:var(--type-micro); line-height:1.45; } .credibility-bridge .credibility-panel dt { font-size:1.5rem; line-height:1.25; } .credibility-bridge .credibility-panel dd { font-size:1.0625rem; line-height:1.65; } }");
  });

  it("removes Credibility Bridge icons and hover card behavior", () => {
    expect(homeSource).not.toContain("CircleCheck");
    expect(pageStyles).not.toContain(".credibility-bridge .credibility-panel > div:hover");
    expect(pageStyles).not.toContain(".credibility-bridge .credibility-panel svg");
  });

  it("uses a shared responsive card gap outside the supplied visual packages", () => {
    expect(pageStyles).toContain(":root { --gws-card-gap:16px; --gws-card-gap-mobile:14px; }");
    expect(pageStyles).toContain(".credibility-panel,.problem-panel,.outcomes-panel,.fit-panel,.solution-matrix,.outcome-choice-grid { gap:var(--gws-card-gap); }");
    expect(pageStyles).toContain(".credibility-panel,.problem-panel,.outcomes-panel,.fit-panel,.solution-matrix,.outcome-choice-grid { gap:var(--gws-card-gap-mobile); }");
  });
});
