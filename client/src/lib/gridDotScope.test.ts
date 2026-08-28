import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const packageSource = readFileSync(
  new URL("../components/revenue-infrastructure-package/App.tsx", import.meta.url),
  "utf8",
);

describe("homepage grid-dot scope", () => {
  it("keeps the page shell free of a site-wide grid canvas", () => {
    expect(homeSource).not.toContain("gridCanvasRef");
    expect(homeSource).not.toContain("spotRef");
    expect(homeSource).not.toContain("activeRef");
  });

  it("preserves the unchanged package canvas inside Revenue Infrastructure", () => {
    expect(packageSource).toContain("gridCanvasRef");
    expect(packageSource).toContain("Dot-grid spotlight");
  });
});
