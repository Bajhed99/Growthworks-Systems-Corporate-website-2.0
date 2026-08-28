import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("homepage card dropdown shadows", () => {
  it("defines one shared dropdown-style elevation system", () => {
    expect(pageStyles).toContain("--gws-card-dropdown-shadow:0 7px 16px rgba(43,43,43,.12);");
    expect(pageStyles).toContain("--gws-card-dropdown-shadow-hover:0 12px 24px rgba(43,43,43,.2);");
  });

  it("applies the shared resting shadow to homepage-owned cards only", () => {
    expect(pageStyles).toContain(".credibility-panel > div,.problem-card,.outcomes-panel article,.fit-panel > div,.solution-row,.outcome-choice { box-shadow:var(--gws-card-dropdown-shadow); }");
    expect(pageStyles).toContain(".outcome-choice.is-active { box-shadow:inset 0 4px 0 var(--maroon),var(--gws-card-dropdown-shadow); }");
  });

  it("retains the shared dropdown elevation on hover without targeting isolated package classes", () => {
    expect(pageStyles).toContain("box-shadow:var(--gws-card-dropdown-shadow-hover);");
    expect(pageStyles).not.toContain(".gws-page .gws-card-dropdown-shadow");
    expect(pageStyles).not.toContain(".journey-panel { box-shadow:var(--gws-card-dropdown-shadow);");
  });
});
