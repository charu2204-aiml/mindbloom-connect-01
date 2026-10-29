import { describe, it, expect } from "vitest";
import { NAV_ITEMS } from "@/data/navigation";

describe("Phase 1: Responsive Navigation System", () => {
  it("defines exactly six navigation destinations in the requested order", () => {
    expect(NAV_ITEMS).toHaveLength(6);

    expect(NAV_ITEMS[0]?.name).toBe("Find Your Consultant");
    expect(NAV_ITEMS[0]?.shortLabel).toBe("Find");
    expect(NAV_ITEMS[0]?.target).toBe("consultants");

    expect(NAV_ITEMS[1]?.name).toBe("Updates & Aftercare");
    expect(NAV_ITEMS[1]?.shortLabel).toBe("Aftercare");
    expect(NAV_ITEMS[1]?.target).toBe("care");

    expect(NAV_ITEMS[2]?.name).toBe("About TheraPeace");
    expect(NAV_ITEMS[2]?.shortLabel).toBe("About");
    expect(NAV_ITEMS[2]?.target).toBe("/about");

    expect(NAV_ITEMS[3]?.name).toBe("Rider Details");
    expect(NAV_ITEMS[3]?.shortLabel).toBe("Rider");
    expect(NAV_ITEMS[3]?.target).toBe("rider");

    expect(NAV_ITEMS[4]?.name).toBe("Live Tracking");
    expect(NAV_ITEMS[4]?.shortLabel).toBe("Tracking");
    expect(NAV_ITEMS[4]?.target).toBe("tracking");

    expect(NAV_ITEMS[5]?.name).toBe("Food & Travel Packages");
    expect(NAV_ITEMS[5]?.shortLabel).toBe("Packages");
    expect(NAV_ITEMS[5]?.target).toBe("packages");
  });

  it("assigns appropriate route vs section types", () => {
    const routeItems = NAV_ITEMS.filter((item) => item.type === "route");
    const sectionItems = NAV_ITEMS.filter((item) => item.type === "section");

    expect(routeItems.map((i) => i.id)).toEqual(["about"]);
    expect(sectionItems.map((i) => i.id)).toEqual([
      "consultants",
      "care",
      "rider",
      "tracking",
      "packages",
    ]);
  });
});
