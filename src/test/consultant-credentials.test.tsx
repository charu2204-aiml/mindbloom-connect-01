import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CredentialModal } from "@/components/CredentialModal";
import { IntroVideoModal } from "@/components/IntroVideoModal";
import { consultants } from "@/data/consultants";

describe("Phase 2: Consultant Discovery & Professional Credential Display", () => {
  const sampleConsultant = consultants[0]!;

  describe("CredentialModal", () => {
    it("renders consultant details, qualifications, and registration identifier", () => {
      render(<CredentialModal consultant={sampleConsultant} onClose={vi.fn()} onBook={vi.fn()} />);

      // Name appears in header and inside mockup certificate
      expect(screen.getByRole("heading", { name: sampleConsultant.name })).toBeInTheDocument();
      expect(screen.getAllByText(sampleConsultant.name)).toHaveLength(2);

      // License appears in details and certificate
      expect(screen.getAllByText(sampleConsultant.license).length).toBeGreaterThanOrEqual(1);

      // Qualifications and Authority
      expect(screen.getByText(sampleConsultant.qualification!)).toBeInTheDocument();
      expect(screen.getByText("Rehabilitation Council of India (RCI)")).toBeInTheDocument();
    });

    it("prominently renders the DEMO watermark and unverified status notice", () => {
      render(<CredentialModal consultant={sampleConsultant} onClose={vi.fn()} onBook={vi.fn()} />);

      expect(screen.getByText("DEMO — NOT A REAL CERTIFICATE")).toBeInTheDocument();
      expect(screen.getByText("Sample Demo Data · Unverified in Real World")).toBeInTheDocument();
      expect(
        screen.getByText(/This prototype does not independently verify professional credentials/i),
      ).toBeInTheDocument();
    });

    it("triggers onClose when clicking close button and onBook when clicking Book Consultation", () => {
      const handleClose = vi.fn();
      const handleBook = vi.fn();

      render(
        <CredentialModal consultant={sampleConsultant} onClose={handleClose} onBook={handleBook} />,
      );

      const closeButton = screen.getByLabelText("Close credentials modal");
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);

      const bookButton = screen.getByRole("button", { name: "Book Consultation" });
      fireEvent.click(bookButton);
      expect(handleBook).toHaveBeenCalledTimes(1);
    });

    it("closes upon pressing Escape", () => {
      const handleClose = vi.fn();
      render(
        <CredentialModal consultant={sampleConsultant} onClose={handleClose} onBook={vi.fn()} />,
      );

      fireEvent.keyDown(window, { key: "Escape" });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("IntroVideoModal", () => {
    it("displays honest coming-soon placeholder when consultant has no real video asset", () => {
      render(<IntroVideoModal consultant={sampleConsultant} onClose={vi.fn()} onBook={vi.fn()} />);

      expect(screen.getByText("Introduction Video Coming Soon")).toBeInTheDocument();
      expect(screen.getByText("Authentic Clinic Introduction in Preparation")).toBeInTheDocument();
      expect(
        screen.getByText(
          /TheraPeace does not use stock footage or unrelated actor demonstrations/i,
        ),
      ).toBeInTheDocument();
    });

    it("triggers onClose and onBook callbacks cleanly", () => {
      const handleClose = vi.fn();
      const handleBook = vi.fn();

      render(
        <IntroVideoModal consultant={sampleConsultant} onClose={handleClose} onBook={handleBook} />,
      );

      const closeButton = screen.getByLabelText("Close introduction video modal");
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);

      const bookButton = screen.getByRole("button", { name: "Book Consultation" });
      fireEvent.click(bookButton);
      expect(handleBook).toHaveBeenCalledTimes(1);
    });

    it("closes upon pressing Escape", () => {
      const handleClose = vi.fn();
      render(
        <IntroVideoModal consultant={sampleConsultant} onClose={handleClose} onBook={vi.fn()} />,
      );

      fireEvent.keyDown(window, { key: "Escape" });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});
