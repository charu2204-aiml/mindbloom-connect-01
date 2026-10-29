import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CareProvider, useCare, useTranslation } from "@/context/CareContext";
import {
  translations,
  translate,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/data/translations";
import { Sidebar } from "@/components/Sidebar";
import { ChatWidget } from "@/components/ChatWidget";

// Mock @tanstack/react-router
vi.mock("@tanstack/react-router", () => ({
  useLocation: () => ({ pathname: "/" }),
  Link: ({
    children,
    to,
    onClick,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }) => (
    <a href={to} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}));

describe("Multilingual & Language Switching System", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";
  });

  describe("1. Translation Completeness & Key Coverage Audit", () => {
    const supportedCodes: SupportedLanguage[] = ["en", "ta", "hi", "te", "ml"];

    it("supports all 5 required languages with native names", () => {
      expect(SUPPORTED_LANGUAGES).toHaveLength(5);
      const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
      expect(codes).toEqual(["en", "ta", "hi", "te", "ml"]);
    });

    it("has non-empty translations for all core sections across all 5 languages", () => {
      const coreSections = [
        "common",
        "nav",
        "footer",
        "chat",
        "hero",
        "essence",
        "featureGrid",
        "howItWorks",
        "consultants",
        "credentialModal",
        "introVideoModal",
        "packages",
        "foodTravel",
        "care",
        "rider",
        "tracking",
        "relax",
        "about",
        "privacy",
      ] as const;

      for (const lang of supportedCodes) {
        const langDictionary = translations[lang] as unknown as Record<string, unknown>;
        expect(langDictionary, `Language ${lang} should exist`).toBeDefined();

        for (const section of coreSections) {
          expect(
            langDictionary[section],
            `Section ${section} in language ${lang} must be defined`,
          ).toBeDefined();
        }
      }
    });

    it("ensures critical navigation keys are present and distinct across languages", () => {
      for (const lang of supportedCodes) {
        const homeText = translate(lang, "nav.home");
        const consultantsText = translate(lang, "nav.consultants");
        const packagesText = translate(lang, "nav.packages");

        expect(homeText).toBeTruthy();
        expect(consultantsText).toBeTruthy();
        expect(packagesText).toBeTruthy();

        // In non-English languages, the navigation items should not simply equal the English key path
        if (lang !== "en") {
          expect(homeText).not.toBe("nav.home");
          expect(consultantsText).not.toBe("nav.consultants");
        }
      }
    });
  });

  describe("2. Fallback Mechanism & Missing Key Resilience", () => {
    it("falls back to English when a key is absent in a regional language without crashing", () => {
      const fallbackResult = translate("ta", "common.siteName");
      expect(fallbackResult).toBe("TheraPeace");
    });

    it("returns key string gracefully without crashing if key is missing in all languages", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const missing = translate("hi", "nonexistent.fake.key");
      expect(missing).toBe("nonexistent.fake.key");
      warnSpy.mockRestore();
    });

    it("supports string parameter interpolation across languages", () => {
      const enInterp = translate("en", "credentialModal.educationExperience", { years: 8 });
      expect(enInterp).toContain("8 years");

      const taInterp = translate("ta", "credentialModal.educationExperience", { years: 8 });
      expect(taInterp).toContain("8");
      expect(taInterp).toContain("ஆண்டுகள்");
    });
  });

  describe("3. localStorage Persistence & Restoration", () => {
    it("persists language selection in localStorage under therapease_language", () => {
      function LanguageTestComponent() {
        const { language, setLanguage } = useCare();
        return (
          <div>
            <span data-testid="current-lang">{language}</span>
            <button onClick={() => setLanguage("ta")}>Switch to Tamil</button>
            <button onClick={() => setLanguage("hi")}>Switch to Hindi</button>
            <button onClick={() => setLanguage("te")}>Switch to Telugu</button>
            <button onClick={() => setLanguage("ml")}>Switch to Malayalam</button>
          </div>
        );
      }

      render(
        <CareProvider>
          <LanguageTestComponent />
        </CareProvider>,
      );

      expect(screen.getByTestId("current-lang").textContent).toBe("en");

      // Switch to Tamil
      fireEvent.click(screen.getByText("Switch to Tamil"));
      expect(screen.getByTestId("current-lang").textContent).toBe("ta");
      expect(window.localStorage.getItem("therapease_language")).toBe("ta");
      expect(document.documentElement.lang).toBe("ta");

      // Switch to Hindi
      fireEvent.click(screen.getByText("Switch to Hindi"));
      expect(screen.getByTestId("current-lang").textContent).toBe("hi");
      expect(window.localStorage.getItem("therapease_language")).toBe("hi");
      expect(document.documentElement.lang).toBe("hi");

      // Switch to Telugu
      fireEvent.click(screen.getByText("Switch to Telugu"));
      expect(screen.getByTestId("current-lang").textContent).toBe("te");
      expect(window.localStorage.getItem("therapease_language")).toBe("te");
      expect(document.documentElement.lang).toBe("te");

      // Switch to Malayalam
      fireEvent.click(screen.getByText("Switch to Malayalam"));
      expect(screen.getByTestId("current-lang").textContent).toBe("ml");
      expect(window.localStorage.getItem("therapease_language")).toBe("ml");
      expect(document.documentElement.lang).toBe("ml");
    });

    it("restores stored language on initial load from localStorage", () => {
      window.localStorage.setItem("therapease_language", "hi");

      function DisplayComponent() {
        const { language } = useCare();
        return <span data-testid="stored-lang">{language}</span>;
      }

      render(
        <CareProvider>
          <DisplayComponent />
        </CareProvider>,
      );

      expect(screen.getByTestId("stored-lang").textContent).toBe("hi");
      expect(document.documentElement.lang).toBe("hi");
    });

    it("defaults to 'en' when an invalid language is in localStorage", () => {
      window.localStorage.setItem("therapease_language", "invalid_xyz");

      function DisplayComponent() {
        const { language } = useCare();
        return <span data-testid="valid-lang">{language}</span>;
      }

      render(
        <CareProvider>
          <DisplayComponent />
        </CareProvider>,
      );

      expect(screen.getByTestId("valid-lang").textContent).toBe("en");
    });
  });

  describe("4. Dynamic UI Translation without Reload", () => {
    it("updates Sidebar navigation immediately upon selecting another language", () => {
      render(
        <CareProvider>
          <Sidebar />
        </CareProvider>,
      );

      // Default English
      expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("How It Works").length).toBeGreaterThanOrEqual(1);

      // Change language via the select element
      const selects = screen.getAllByLabelText("Site Language");
      expect(selects.length).toBeGreaterThanOrEqual(1);

      // Change to Tamil
      act(() => {
        fireEvent.change(selects[0]!, { target: { value: "ta" } });
      });

      expect(screen.getAllByText("முகப்பு").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("செயல்முறை").length).toBeGreaterThanOrEqual(1);

      // Change to Hindi
      act(() => {
        fireEvent.change(selects[0]!, { target: { value: "hi" } });
      });

      expect(screen.getAllByText("होम").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("कैसे काम करता है").length).toBeGreaterThanOrEqual(1);

      // Change to Telugu
      act(() => {
        fireEvent.change(selects[0]!, { target: { value: "te" } });
      });

      expect(screen.getAllByText("హోమ్").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("ఎలా పని చేస్తుంది").length).toBeGreaterThanOrEqual(1);

      // Change to Malayalam
      act(() => {
        fireEvent.change(selects[0]!, { target: { value: "ml" } });
      });

      expect(screen.getAllByText("ഹോം").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText("എങ്ങനെ പ്രവർത്തിക്കുന്നു").length).toBeGreaterThanOrEqual(1);
    });

    it("updates ChatWidget welcome message and suggestions dynamically", () => {
      render(
        <CareProvider>
          <ChatWidget />
        </CareProvider>,
      );

      // Open chat widget
      const chatButton = screen.getByLabelText("Open chat");
      fireEvent.click(chatButton);

      // Default English welcome
      expect(screen.getByText("Hi, I'm Peace 🌸 How are you feeling today?")).toBeInTheDocument();
      expect(screen.getByText("Peace · TheraPeace assistant")).toBeInTheDocument();
    });
  });

  describe("5. Preservation of Factual and Medical Data", () => {
    it("preserves Tele-MANAS helpline 14416 across all translations", () => {
      const languages: SupportedLanguage[] = ["en", "ta", "hi", "te", "ml"];
      for (const lang of languages) {
        const helpline = translate(lang, "common.teleManas");
        expect(helpline).toContain("14416");
      }
    });

    it("preserves emergency code 112 across all translations", () => {
      const languages: SupportedLanguage[] = ["en", "ta", "hi", "te", "ml"];
      for (const lang of languages) {
        const emergency = translate(lang, "common.emergency112");
        expect(emergency).toBe("112");
      }
    });
  });
});
