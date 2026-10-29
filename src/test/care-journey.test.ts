import { describe, it, expect } from "vitest";
import { completeSession, hasCompletedSession, type CareSession } from "@/lib/care-journey";

describe("Care continuity after the first in-person session", () => {
  const requested: CareSession = {
    id: "first",
    consultant: "Test consultant",
    date: "2026-10-20",
    time: "10:00",
    status: "Requested",
  };
  it("does not open after-session updates before a completed first visit", () => {
    expect(hasCompletedSession([requested])).toBe(false);
  });
  it("opens after-session updates when the first visit is completed", () => {
    const result = completeSession([requested], "first");
    expect(result[0]?.status).toBe("Completed");
    expect(hasCompletedSession(result)).toBe(true);
    expect(requested.status).toBe("Requested");
  });
  it("keeps a requested follow-up date when an earlier visit is completed", () => {
    const followup: CareSession = { ...requested, id: "followup", date: "2026-10-27" };
    expect(completeSession([requested, followup], "first")[1]).toEqual(followup);
  });
});
