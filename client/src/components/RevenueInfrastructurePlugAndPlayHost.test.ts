import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const hostSource = readFileSync(new URL("./RevenueInfrastructurePlugAndPlayHost.tsx", import.meta.url), "utf8");
const packageSource = readFileSync(new URL("./revenue-infrastructure-package/App.tsx", import.meta.url), "utf8");
const packageStyles = readFileSync(new URL("./revenue-infrastructure-package/index.css", import.meta.url), "utf8");

describe("Revenue Infrastructure scoped refinement", () => {
  it("keeps the package mounted through the existing isolated host", () => {
    expect(homeSource).toContain("RevenueInfrastructurePlugAndPlayHost");
    expect(homeSource).not.toContain("RevenueInfrastructureFull");
  });

  it("uses the Revenue Infrastructure section as the isolated package root without a redundant outer wrapper", () => {
    expect(homeSource).not.toContain('<section id="revenue-infrastructure" className="homepage-visual-section" aria-label="Revenue Infrastructure">');
    expect(hostSource).toContain('id="revenue-infrastructure"');
    expect(hostSource).toContain('className="homepage-visual-section gws-page"');
    expect(hostSource).toContain('const hostStyles = packageStyles.replaceAll(".gws-page", ":host");');
    expect(hostSource).toContain("<style>{hostStyles}</style>");
    expect(packageSource).not.toContain('<div className="gws-page"');
  });

  it("applies only the requested desktop copy and Agentic Search label changes", () => {
    expect(packageSource).toContain("compounds when<br />the system");
    expect(packageSource).toContain("The same capabilities produce very different results when they work as one connected system.");
    expect(packageSource).toContain('label: "Agentic Search"');
    expect(packageSource).not.toContain('label: "Search & AI Visibility"');
  });

  it("uses the requested Growth Crimson emphasis for Growth and connects in the section heading", () => {
    expect(packageSource).toContain('<span className="gws-diagram-heading-accent">Growth</span>');
    expect(packageSource).toContain('<span className="gws-diagram-heading-accent">connects</span>');
    expect(packageStyles).toContain(".gws-page .gws-diagram-heading-accent {");
    expect(packageStyles).toContain("color: #841617;");
  });

  it("keeps desktop animations and interaction data while scoping the static centerpiece to narrow layouts", () => {
    expect(packageSource).toContain("requestAnimationFrame(draw)");
    expect(packageSource).toContain("setActiveBadge(p => p === i ? null : i)");
    expect(packageSource).toContain("if (isNarrow) setActiveBadge(null)");
    expect(packageStyles).toContain("animation: beam-h 1.8s ease-in-out infinite;");
  });

  it("uses zero-radius, 2px Growth Crimson connector and accordion treatments", () => {
    expect(packageStyles).toContain("border-radius: 0 !important;");
    expect(packageStyles).toContain("height: 2px;");
    expect(packageStyles).toContain("width: 2px;");
    expect(packageStyles).toContain("background: #841617;");
    expect(packageStyles).toContain("border-right: 2px solid #841617;");
    expect(packageStyles).toContain("rgba(132, 22, 23, 0.28)");
    expect(packageStyles).toContain("#841617 28%, #841617 72%");
  });

  it("keeps desktop side columns readable and restores the original control-border palette", () => {
    expect(packageSource).toContain('maxWidth: "1400px"');
    expect(packageStyles).toContain("flex: 0 0 350px;");
    expect(packageStyles).toContain("min-width: 350px;");
    expect(packageStyles).toContain("padding: 0px 40px;");
    expect(packageStyles).toContain("border-color: #E8E2D9;");
    expect(packageStyles).toContain("border-right-color: #D4CCC0;");
    expect(packageStyles).toContain("border-color: #B8863B;");
    expect(packageStyles).toContain("border-color: #7A1E22;");
  });

  it("keeps Revenue Infrastructure outcome labels at the requested aligned width", () => {
    expect(packageSource).toContain('flexShrink: 0, width: "70px"');
    expect(packageSource).toContain('margin: "8px 0 0 82px"');
  });
});
