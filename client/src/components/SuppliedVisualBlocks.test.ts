import { describe, expect, it } from "vitest";

import {
  REVENUE_INFRASTRUCTURE_CAPABILITIES,
  REVENUE_INFRASTRUCTURE_OUTCOMES,
  REVENUE_INFRASTRUCTURE_TOOLS,
} from "./SuppliedVisualBlocks";

describe("Revenue Infrastructure supplied visual adaptation", () => {
  it("keeps the approved three-layer reading sequence", () => {
    expect(REVENUE_INFRASTRUCTURE_TOOLS.map(({ label }) => label)).toEqual([
      "Website",
      "Agentic Search",
      "CRM",
      "Lead Response",
      "Automation",
      "Analytics",
    ]);
    expect(REVENUE_INFRASTRUCTURE_CAPABILITIES.map(({ label }) => label)).toEqual([
      "Digital Presence",
      "Lead Response",
      "Sales Operations",
      "Revenue Intelligence",
    ]);
    expect(REVENUE_INFRASTRUCTURE_OUTCOMES.map(({ phase }) => phase)).toEqual([
      "ATTRACT",
      "CONVERT",
      "RETAIN",
      "GROW",
    ]);
  });

  it("keeps outcome content concise and avoids an additional section CTA", () => {
    expect(REVENUE_INFRASTRUCTURE_OUTCOMES).toHaveLength(4);
    expect(REVENUE_INFRASTRUCTURE_OUTCOMES.every(({ detail }) => detail.split(/\s+/).length <= 18)).toBe(true);
  });
});
