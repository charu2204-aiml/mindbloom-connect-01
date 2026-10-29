import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { calculatePackageTotal, type CareSession } from "@/lib/care-journey";
import { CareJourney } from "@/components/CareJourney";
import { travelPackages, foodPackages } from "@/data/consultants";
import { Route as FoodTravelRoute } from "@/routes/food-travel";
import { CareProvider } from "@/context/CareContext";
import { RiderDetails } from "@/components/RiderDetails";

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...actual,
    useLocation: () => ({ pathname: "/food-travel" }),
    useRouter: () => ({ navigate: vi.fn(), options: {} }),
    Link: ({
      to,
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

describe("Phase 5: Food & Travel Packages Calculation and Logic", () => {
  it("calculates session fee only when no travel or food package is selected", () => {
    const total = calculatePackageTotal(2000, 0, 0, 1);
    expect(total).toBe(2000);
  });

  it("calculates total with travel package included", () => {
    const travelCost = travelPackages[0]?.price ?? 600; // Local
    const total = calculatePackageTotal(2000, travelCost, 0, 1);
    expect(total).toBe(2600);
  });

  it("calculates total with food package multiplied by days of stay", () => {
    const foodDaily = foodPackages[0]?.perDay ?? 450; // Veg Wellness
    const days = 3;
    const total = calculatePackageTotal(2000, 0, foodDaily, days);
    expect(total).toBe(2000 + 450 * 3); // 3350
  });

  it("calculates combined bundle: session + travel + food × days", () => {
    const session = 1500;
    const travelCost = 2500; // Regional
    const foodDaily = 650; // Non-Veg Comfort
    const days = 4;
    const total = calculatePackageTotal(session, travelCost, foodDaily, days);
    expect(total).toBe(1500 + 2500 + 650 * 4); // 6600
  });
});

describe("Phase 5: CareJourney Display of Bundled Packages", () => {
  it("displays bundled travel and food packages along with total estimated cost in appointments tab", () => {
    const demoSessions: CareSession[] = [
      {
        id: "sess-bundle-1",
        consultant: "Dr. Ananya Krishnan",
        date: "2026-11-10",
        time: "10:30",
        status: "Requested",
        travelPackage: "Regional",
        travelPrice: 2500,
        foodPackage: "Veg Wellness",
        foodPrice: 450,
        days: 2,
        totalEstimatedCost: 5400,
      },
    ];

    render(<CareJourney sessions={demoSessions} onSessionsChange={() => {}} onBook={() => {}} />);

    // Open appointments tab via trigger button
    const openAppointmentsBtn = screen.getByRole("button", {
      name: "Open appointments",
    });
    fireEvent.click(openAppointmentsBtn);

    // Verify appointment details and package tags
    expect(screen.getByText("Dr. Ananya Krishnan")).toBeInTheDocument();
    expect(screen.getByText("Bundled Care Logistics (Demo)")).toBeInTheDocument();
    expect(screen.getByText(/🚗 Regional \(₹2,500\)/)).toBeInTheDocument();
    expect(screen.getByText(/🥗 Veg Wellness \(2d\) \(₹900\)/)).toBeInTheDocument();
    expect(screen.getByText("₹5,400")).toBeInTheDocument();
  });
});

describe("Phase 5: Full Page Interactive Package Selection and Booking Flow", () => {
  it("renders package builder with 'No package' option and reacts to selection changes", () => {
    const Component = FoodTravelRoute.options.component!;
    render(
      <CareProvider>
        <Component />
      </CareProvider>,
    );

    // Check presence of "No travel package" and "No food package"
    expect(screen.getByText("No travel package")).toBeInTheDocument();
    expect(screen.getByText("No food package")).toBeInTheDocument();

    // Check transparency notices
    expect(
      screen.getByText(/Illustrative sample rates\. Not confirmed commercial bookings\./),
    ).toBeInTheDocument();

    // Click "No travel package"
    const noTravelBtn = screen.getByRole("button", { name: /No travel package/ });
    fireEvent.click(noTravelBtn);

    // Click "No food package"
    const noFoodBtn = screen.getByRole("button", { name: /No food package/ });
    fireEvent.click(noFoodBtn);

    // Check that breakdown reflects Travel None and Food None
    expect(screen.getByText("Travel (None)")).toBeInTheDocument();
    expect(screen.getByText("Food (None)")).toBeInTheDocument();
  });

  it("does not automatically assign a rider or start tracking when a package is selected in the builder", () => {
    const Component = FoodTravelRoute.options.component!;
    render(
      <CareProvider>
        <Component />
        <RiderDetails sessions={[]} />
      </CareProvider>,
    );

    // Select State-wide package in package builder
    const statewideBtn = screen.getByRole("button", { name: /State-wide/ });
    fireEvent.click(statewideBtn);

    // Rider details section should STILL show empty state ("Not assigned")
    expect(screen.getByText("Not assigned")).toBeInTheDocument();
    expect(screen.getByText("No Transport Companion Assigned Yet")).toBeInTheDocument();
  });

  it("allows booking from package builder and carries package choices into booking modal", () => {
    const Component = FoodTravelRoute.options.component!;
    render(
      <CareProvider>
        <Component />
      </CareProvider>,
    );

    // Select Regional travel package
    const regionalBtn = screen.getByRole("button", { name: /Regional/ });
    fireEvent.click(regionalBtn);

    // Select Non-Veg Comfort food package
    const nonVegBtn = screen.getByRole("button", { name: /Non-Veg Comfort/ });
    fireEvent.click(nonVegBtn);

    // Click "Book with this package"
    const bookWithPkgBtn = screen.getByRole("button", { name: "Book with this package" });
    fireEvent.click(bookWithPkgBtn);

    // Verify modal is open and shows packages title
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Care & logistics packages (optional)")).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Travel package")).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Food & nutrition package")).toBeInTheDocument();

    // Fill in required booking inputs
    fireEvent.change(within(dialog).getByPlaceholderText("Your name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(within(dialog).getByLabelText("Session date"), {
      target: { value: "2026-11-15" },
    });
    fireEvent.change(within(dialog).getByLabelText("Session time"), {
      target: { value: "14:00" },
    });
    fireEvent.change(within(dialog).getByPlaceholderText("What would you like help with?"), {
      target: { value: "Stress and work burnout" },
    });

    // Submit booking form
    const submitBtn = within(dialog).getByRole("button", { name: /Submit for approval/ });
    fireEvent.click(submitBtn);

    // Confirmation screen should be displayed within dialog
    expect(within(dialog).getByText("Request submitted")).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Prototype request added to your care dates/),
    ).toBeInTheDocument();
    expect(within(dialog).getByText(/Regional/)).toBeInTheDocument();
    expect(within(dialog).getByText(/Non-Veg Comfort/)).toBeInTheDocument();
  });
});
