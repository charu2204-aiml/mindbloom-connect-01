export type CareSession = {
  id: string;
  consultant: string;
  date: string;
  time: string;
  status: "Requested" | "Completed";
};

export function completeSession(sessions: CareSession[], id: string): CareSession[] {
  return sessions.map((session) => session.id === id ? { ...session, status: "Completed" } : session);
}

export function hasCompletedSession(sessions: CareSession[]) {
  return sessions.some((session) => session.status === "Completed");
}