import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Problem Recognition heading emphasis", () => {
  it("uses the requested Growth Crimson treatment for valuable", () => {
    expect(homeSource).toContain('Where <span className="problem-heading-accent">valuable</span> opportunity gets lost.');
    expect(pageStyles).toContain(".problem-recognition-section .problem-heading-accent { color:#841617; }");
  });

  it("gives individual problem cards more breathing room with restrained elevation", () => {
    expect(pageStyles).toContain("--gws-problem-card-gap:16px;");
    expect(pageStyles).toContain("--gws-problem-card-gap:14px;");
    expect(pageStyles).toContain(".problem-recognition-section .problem-panel { gap:var(--gws-problem-card-gap); }");
    expect(pageStyles).toContain(".problem-recognition-section .problem-card { background:var(--gws-surface); box-shadow:var(--gws-problem-card-shadow); }");
    expect(pageStyles).toContain(".problem-recognition-section .problem-card:hover { box-shadow:var(--gws-problem-card-shadow-hover); }");
  });
});
