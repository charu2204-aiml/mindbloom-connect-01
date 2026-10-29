import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LiveTracking } from "@/components/LiveTracking";
import { type CareSession } from "@/lib/care-journey";

describe("Phase 4: Live Tracking Interface", () => {
  it("renders the honest empty state when no active journey exists", () => {
    render(<LiveTracking sessions={[]} />);

    expect(screen.getByText("No active trip")).toBeInTheDocument();
    expect(screen.getByText("No Active Journey to Track")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Find a Consultant to Book" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Simulate Route (Demo)" })).toBeInTheDocument();
  });

  it("renders active tracking dashboard with demo disclosure when preview is clicked", () => {
    render(<LiveTracking sessions={[]} />);

    const previewBtn = screen.getByRole("button", {
      name: "Simulate Route (Demo)",
    });
    fireEvent.click(previewBtn);

    expect(screen.getByText("Demo tracking — simulated location")).toBeInTheDocument();
    expect(screen.getByText("Patient Doorstep")).toBeInTheDocument();
    expect(screen.getByText("Pickup Location")).toBeInTheDocument();
    expect(screen.getAllByText("Clinic Destination").length).toBeGreaterThanOrEqual(1);
  });

  it("binds to booked consultant name and displays 'Awaiting assignment' initially", () => {
    const demoSessions: CareSession[] = [
      {
        id: "sess-tracking-1",
        consultant: "Dr. Kavya Iyer",
        date: "2026-11-12",
        time: "15:00",
        status: "Requested",
      },
    ];

    render(<LiveTracking sessions={demoSessions} />);

    expect(screen.getByText("Dr. Kavya Iyer Practice")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Awaiting assignment" })).toBeInTheDocument();
    expect(screen.getAllByText("Unavailable in demo mode").length).toBeGreaterThanOrEqual(1);
  });

  it("updates trip status and progress percentage when status step is clicked", () => {
    render(<LiveTracking sessions={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Simulate Route (Demo)" }));

    const onTheWayBtn = screen.getByRole("button", { name: "On the way" });
    fireEvent.click(onTheWayBtn);

    // Verify progress updated to 60%
    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByText("18 mins (Demo Route)")).toBeInTheDocument();
    expect(screen.getByText("11.2 km (Sample)")).toBeInTheDocument();
  });

  it("provides cross-feature navigation links to Rider Details and Care Journey", () => {
    render(<LiveTracking sessions={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Simulate Route (Demo)" }));

    expect(
      screen.getByRole("button", { name: /View Assigned Rider Details/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /View Care Journey & Aftercare/i }),
    ).toBeInTheDocument();
  });
});
