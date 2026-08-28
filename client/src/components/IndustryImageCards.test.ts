import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");
const pageStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("Who GWS Serves industry image cards", () => {
  it("uses managed, descriptive image-card data for each named industry", () => {
    expect(homeSource).toContain('label: "Home Services", image: "/manus-storage/gws-home-services_c087c1b6.webp"');
    expect(homeSource).toContain('label: "Financial Advisors", image: "/manus-storage/gws-financial-advisors_49f31a4b.jpg"');
    expect(homeSource).toContain('label: "Insurance Agencies", image: "/manus-storage/gws-insurance-agencies_52c9e522.jpg"');
    expect(homeSource).toContain('className="industry-image-card"');
  });

  it("places three labeled cards horizontally below the approved copy on larger screens", () => {
    expect(pageStyles).toContain(".industry-card-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; max-width:520px; margin-top:28px; }");
    expect(pageStyles).toContain(".industry-image-card span { padding:12px; font-size:12px; font-weight:700; line-height:1.25; }");
  });

  it("retains image scale and a Growth Crimson border without a red hover drop shadow", () => {
    expect(pageStyles).toContain(".industry-image-card:hover { border-color:var(--gws-crimson); transform:translateY(-2px); }");
    expect(pageStyles).not.toContain(".industry-image-card:hover { border-color:var(--gws-crimson); box-shadow:var(--gws-crimson-drop-shadow);");
    expect(pageStyles).toContain(".industry-image-card:hover img { transform:scale(1.06); }");
  });
});
