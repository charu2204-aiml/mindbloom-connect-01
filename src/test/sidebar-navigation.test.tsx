import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { SIDEBAR_ITEMS } from "@/data/navigation";
import { Sidebar, MobileTopNav, AppLayout } from "@/components/Sidebar";
import { CareProvider } from "@/context/CareContext";
import { routeTree } from "@/routeTree.gen";

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...actual,
    useLocation: () => ({ pathname: "/consultants" }),
    useRouter: () => ({ navigate: vi.fn(), options: {} }),
    Link: ({
      to,
      children,
      onClick,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }) => (
      <a href={to} onClick={onClick} {...props}>
        {children}
      </a>
    ),
  };
});

describe("Sidebar & Multi-Page Navigation", () => {
  it("defines the 10 navigation destinations in the exact order requested", () => {
    expect(SIDEBAR_ITEMS).toHaveLength(10);

    const expected = [
      { name: "Home", to: "/" },
      { name: "How It Works", to: "/how-it-works" },
      { name: "Find Your Consultant", to: "/consultants" },
      { name: "Packages", to: "/packages" },
      { name: "Updates & Aftercare", to: "/care" },
      { name: "About TheraPeace", to: "/about" },
      { name: "Rider Details", to: "/rider" },
      { name: "Live Tracking", to: "/tracking" },
      { name: "Food & Travel Packages", to: "/food-travel" },
      { name: "Relax", to: "/relax" },
    ];

    expected.forEach((exp, i) => {
      expect(SIDEBAR_ITEMS[i]?.name).toBe(exp.name);
      expect(SIDEBAR_ITEMS[i]?.to).toBe(exp.to);
    });
  });

  it("renders the desktop sidebar with branding and highlights active route", () => {
    render(
      <CareProvider>
        <Sidebar />
      </CareProvider>,
    );

    // Verify brand logo
    expect(screen.getAllByText("TheraPeace").length).toBeGreaterThan(0);
    expect(screen.getByText("Tele-MANAS: 14416")).toBeInTheDocument();

    // Verify all 10 links are in the sidebar
    SIDEBAR_ITEMS.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    // Verify active link (/consultants mocked) has aria-current="page"
    const activeLink = screen.getByRole("link", { name: /Find Your Consultant/i });
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("opens and closes the mobile slide-out drawer via hamburger button", () => {
    render(
      <CareProvider>
        <MobileTopNav />
        <Sidebar />
      </CareProvider>,
    );

    // Click hamburger button to open drawer
    const hamburgerBtn = screen.getByRole("button", { name: "Open navigation menu" });
    fireEvent.click(hamburgerBtn);

    // Mobile drawer should now be open
    const drawerDialog = screen.getByRole("dialog", { name: "Mobile Navigation" });
    expect(drawerDialog).toBeInTheDocument();

    // Click close button inside drawer
    const closeBtn = screen.getByRole("button", { name: "Close menu" });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole("dialog", { name: "Mobile Navigation" })).not.toBeInTheDocument();
  });

  it("renders main content layout beside the desktop sidebar", () => {
    const { container } = render(
      <CareProvider>
        <AppLayout>
          <div data-testid="main-test-content">Main Page Content</div>
        </AppLayout>
      </CareProvider>,
    );

    expect(screen.getByTestId("main-test-content")).toBeInTheDocument();
    // Verify content offset class exists
    const offsetContainer = container.querySelector(".md\\:pl-64");
    expect(offsetContainer).toBeInTheDocument();
  });

  it("matches all 10 dedicated routes plus privacy in TanStack Router tree without 404", () => {
    const router = createRouter({
      routeTree,
      context: { queryClient: new QueryClient() },
    });

    const routesToTest = [
      "/",
      "/how-it-works",
      "/consultants",
      "/packages",
      "/care",
      "/about",
      "/rider",
      "/tracking",
      "/food-travel",
      "/relax",
      "/privacy",
    ];

    routesToTest.forEach((path) => {
      const matches = router.matchRoutes(path);
      expect(matches.length).toBeGreaterThan(0);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    });
  });
});
