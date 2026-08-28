import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { BUSINESS_OUTCOMES } from "./BusinessOutcomesInteractive";

const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("BUSINESS_OUTCOMES", () => {
  it("preserves the governing four problem-to-outcome mappings", () => {
    expect(BUSINESS_OUTCOMES.map(({ outcome }) => outcome)).toEqual([
      "Be Found",
      "Capture & Respond",
      "Convert Consistently",
      "Improve & Scale",
    ]);
  });

  it("keeps the interactive section outcome-led and concise", () => {
    expect(BUSINESS_OUTCOMES).toHaveLength(4);
    expect(BUSINESS_OUTCOMES.every(({ result }) => result.split(/\s+/).length <= 14)).toBe(true);
  });

  it("uses the requested red treatment for active outcome titles", () => {
    expect(pageStyles).toContain(".outcome-choice.is-active .outcome-choice-title { color:#E70105; }");
  });
});
