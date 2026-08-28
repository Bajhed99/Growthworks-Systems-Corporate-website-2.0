import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Fixed navigation", () => {
  it("pins the header to the viewport and reserves matching desktop and mobile clearance", () => {
    expect(pageStyles).toContain(":root { --gws-fixed-header-offset:80px; }");
    expect(pageStyles).toContain(".site-header { position:fixed; top:0; right:0; left:0; width:100%; }");
    expect(pageStyles).toContain(".gws-page main { padding-top:var(--gws-fixed-header-offset); }");
    expect(pageStyles).toContain(".gws-page main [id] { scroll-margin-top:var(--gws-fixed-header-offset); }");
    expect(pageStyles).toContain("@media (max-width:760px) { :root { --gws-fixed-header-offset:58px; } }");
  });
});
