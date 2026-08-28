import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Solutions section color treatment", () => {
  it("uses the requested white section surface with a layered approved GWS color composition", () => {
    expect(homeSource).toContain('id="solutions" className="section solutions-section"');
    expect(pageStyles).toContain(".solutions-section { background:#FFFFFF; color:#000000; }");
    expect(pageStyles).toContain(".solutions-section .solution-matrix { border-color:#841617; background:#F8F6EC; }");
    expect(pageStyles).toContain(".solutions-section .solution-heading::before { position:absolute; top:0; bottom:0; left:0; width:4px; background:#841617; content:\"\"; }");
    expect(pageStyles).toContain(".solutions-section .solution-heading b { border-color:#841617; background:#841617; }");
    expect(pageStyles).toContain(".solutions-section .solution-detail { border-top:3px solid #841617; background:#F8F6EC; color:#000000; }");
  });

  it("keeps the Solutions copy and navigation link readable against the white surface", () => {
    expect(pageStyles).toContain(".solutions-section .section-kicker { color:#841617; }");
    expect(pageStyles).toContain(".solutions-section h2 { color:#000000; }");
    expect(homeSource).toContain('Where <span className="solutions-heading-accent">GWS</span> strengthens revenue performance.');
    expect(pageStyles).toContain(".solutions-section .solutions-heading-accent { color:#841617; }");
    expect(pageStyles).toContain(".solutions-section .solution-detail p { color:#000000; }");
    expect(pageStyles).toContain(".solutions-section .text-link { color:#841617; }");
    expect(pageStyles).toContain(".solutions-section .solution-row:hover .solution-heading { background:#841617; }");
  });

  it("limits the gray visual-editor change to the intended supporting paragraph", () => {
    expect(homeSource).toContain("<p style={{color: 'gray'}}>One coordinated set of performance areas — not four separate services.</p>");
    expect(homeSource).not.toContain('className="section-kicker" style={{color: \'gray\'}}');
    expect(homeSource).not.toContain('id="solutions-title" style={{color: \'gray\'}}');
    expect(homeSource).not.toContain('aria-labelledby="solutions-title" style={{color: \'gray\'}}');
  });
});
