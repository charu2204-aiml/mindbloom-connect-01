import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RiderDetails } from "@/components/RiderDetails";
import { type CareSession } from "@/lib/care-journey";

describe("Phase 3: Rider Details", () => {
  it("renders the honest empty state with 'Not assigned' by default when no appointments exist", () => {
    render(<RiderDetails sessions={[]} />);

    expect(screen.getByText("Not assigned")).toBeInTheDocument();
    expect(screen.getByText("No Transport Companion Assigned Yet")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Find a Consultant to Book" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Simulate Assignment (Demo)" })).toBeInTheDocument();
  });

  it("renders sample driver details and masked identifiers when preview is clicked", () => {
    render(<RiderDetails sessions={[]} />);

    const previewButton = screen.getByRole("button", {
      name: "Simulate Assignment (Demo)",
    });
    fireEvent.click(previewButton);

    expect(screen.getByText("Rajesh Kumar")).toBeInTheDocument();
    expect(screen.getByText("White Hyundai Verna")).toBeInTheDocument();
    expect(screen.getByText("TN-09-****-2041")).toBeInTheDocument();
    expect(screen.getByText("DL-04****2021")).toBeInTheDocument();
    expect(screen.getByText("Demo data — not independently verified")).toBeInTheDocument();
  });

  it("automatically renders assigned companion when active booking sessions exist", () => {
    const demoSessions: CareSession[] = [
      {
        id: "sess-1",
        consultant: "Dr. Rohan Mehta",
        date: "2026-11-05",
        time: "11:30",
        status: "Requested",
      },
    ];

    render(<RiderDetails sessions={demoSessions} />);

    expect(screen.getByText("Active Booking Detected")).toBeInTheDocument();
    expect(screen.getByText("Rajesh Kumar")).toBeInTheDocument();
    expect(screen.getByText("Dr. Rohan Mehta")).toBeInTheDocument();
    expect(screen.getByText("View in Care Journey")).toBeInTheDocument();
    expect(screen.getByText("Demo data — not independently verified")).toBeInTheDocument();
  });

  it("opens masked telephony modal upon clicking Contact Rider", () => {
    render(<RiderDetails sessions={[]} />);

    // Activate preview
    fireEvent.click(screen.getByRole("button", { name: "Simulate Assignment (Demo)" }));

    const contactButton = screen.getByRole("button", {
      name: "Contact Rider (Demo)",
    });
    fireEvent.click(contactButton);

    expect(screen.getByRole("heading", { name: "Contact Rajesh Kumar" })).toBeInTheDocument();
    expect(screen.getByText("+91 98*** ***12")).toBeInTheDocument();
    expect(
      screen.getByText(/Demonstration mode: No telephone call will be initiated/i),
    ).toBeInTheDocument();

    const closeBtn = screen.getByLabelText("Close contact modal");
    fireEvent.click(closeBtn);
    expect(screen.queryByText("+91 98*** ***12")).not.toBeInTheDocument();
  });
});
