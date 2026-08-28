import { describe, expect, it } from "vitest";

import { GWS_NAV_GROUPS, GWS_NAV_LINKS } from "./gwsNavigation";

describe("GWS navigation reference structure", () => {
  it("preserves the three referenced grouped desktop menus", () => {
    expect(GWS_NAV_GROUPS.map(({ label }) => label)).toEqual([
      "Revenue Infrastructure",
      "Solutions",
      "Industries",
    ]);
  });

  it("keeps Resources and About as standalone links", () => {
    expect(GWS_NAV_LINKS.map(({ label }) => label)).toEqual(["Resources", "About"]);
  });
});
