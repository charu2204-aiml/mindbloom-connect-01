export type CarePackageDetails = {
  travelPackage?: string | undefined;
  travelPrice?: number | undefined;
  foodPackage?: string | undefined;
  foodPrice?: number | undefined;
  days?: number | undefined;
  totalEstimatedCost?: number | undefined;
};

export type CareSession = {
  id: string;
  consultant: string;
  date: string;
  time: string;
  status: "Requested" | "Completed";
  travelPackage?: string | undefined;
  travelPrice?: number | undefined;
  foodPackage?: string | undefined;
  foodPrice?: number | undefined;
  days?: number | undefined;
  totalEstimatedCost?: number | undefined;
};

export function completeSession(sessions: CareSession[], id: string): CareSession[] {
  return sessions.map((session) =>
    session.id === id ? { ...session, status: "Completed" } : session,
  );
}

export function hasCompletedSession(sessions: CareSession[]) {
  return sessions.some((session) => session.status === "Completed");
}

export function calculatePackageTotal(
  sessionFee: number,
  travelPrice: number = 0,
  foodPrice: number = 0,
  days: number = 1,
): number {
  return sessionFee + travelPrice + foodPrice * Math.max(1, days);
}
