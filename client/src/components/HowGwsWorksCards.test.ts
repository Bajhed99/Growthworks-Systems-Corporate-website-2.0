import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("How GWS Works process cards", () => {
  it("renders the step number above an individual process card", () => {
    expect(homeSource).toContain('<span className="process-step-number">0{index + 1}</span><article className="process-step-card">');
    expect(homeSource).not.toContain('className={index === 0 ? "is-leading" : ""}');
  });

  it("uses Warm Cream card surfaces with the shared dropdown shadow", () => {
    expect(pageStyles).toContain(".process-step-number { width:56px; height:56px; display:grid; place-items:center; justify-self:center; margin:0; border:1px solid var(--gws-border); background:transparent;");
    expect(pageStyles).toContain(".process-step-card { background:#F8F6EC; }");
  });

  it("uses a Growth Crimson connector and pairs restrained hover elevation with a Crimson heading", () => {
    expect(pageStyles).toContain(".process-route::before { background:var(--gws-crimson); }");
    expect(pageStyles).toContain(".process-route::before { display:block; top:28px; right:auto; bottom:28px; left:28px; width:1px; height:auto; }");
    expect(pageStyles).toContain(".process-route li:hover .process-step-number,.process-route li:hover .process-step-card { border-color:var(--gws-crimson); }");
    expect(pageStyles).toContain(":root { --gws-process-hover-shadow:0 10px 18px rgba(132,22,23,.24); }");
    expect(pageStyles).toContain(".process-step-number { transition:transform var(--gws-transition-fast),border-color var(--gws-transition-fast); transform-origin:center; }");
    expect(pageStyles).toContain(".process-route li:hover .process-step-number { transform:scale(1.08); }");
    expect(pageStyles).toContain(".process-route li:hover .process-step-card { transform:translateY(-2px); box-shadow:var(--gws-crimson-drop-shadow); }");
    expect(pageStyles).toContain(".process-route li:hover .process-step-card { box-shadow:var(--gws-process-hover-shadow); }");
    expect(pageStyles).toContain(".process-route li:hover .process-step-card h3 { color:var(--gws-crimson); }");
    expect(pageStyles).not.toContain(".process-route li:hover .process-step-card { background:#FFFFFF;");
    expect(pageStyles).toContain("@media (prefers-reduced-motion:reduce) { .process-route li:hover .process-step-number,.process-route li:hover .process-step-card { transform:none; } }");
  });
});
