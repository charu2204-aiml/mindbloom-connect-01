import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type CareSession, type CarePackageDetails } from "@/lib/care-journey";
import { type Consultant } from "@/data/consultants";
import { type BookingLanguage } from "@/data/booking-languages";
import {
  type SupportedLanguage,
  translations,
  translate,
  type TranslationDictionary,
} from "@/data/translations";
import { siteText } from "@/data/site-text";
import { SiteTextContext } from "@/lib/site-language";
import { BookingModal } from "@/components/BookingModal";
import { CredentialModal } from "@/components/CredentialModal";
import { IntroVideoModal } from "@/components/IntroVideoModal";

export type CareContextType = {
  // Session continuity across all pages
  sessions: CareSession[];
  setSessions: React.Dispatch<React.SetStateAction<CareSession[]>>;
  addSession: (
    consultantName: string,
    date: string,
    time: string,
    details?: CarePackageDetails,
  ) => void;
  markAttended: (id: string) => void;

  // Language selection across all pages
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  translations: TranslationDictionary;

  // Package builder state
  travel: number | null;
  setTravel: (t: number | null) => void;
  food: number | null;
  setFood: (f: number | null) => void;
  days: number;
  setDays: (d: number) => void;

  // Global modals
  bookingConsultant: Consultant | null;
  setBookingConsultant: (c: Consultant | null) => void;
  credentialConsultant: Consultant | null;
  setCredentialConsultant: (c: Consultant | null) => void;
  videoConsultant: Consultant | null;
  setVideoConsultant: (c: Consultant | null) => void;

  // Mobile drawer state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

const CareContext = createContext<CareContextType | null>(null);

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  try {
    const stored =
      window.localStorage.getItem("therapeace_language") ||
      window.localStorage.getItem("therapease_language");
    if (
      stored &&
      (stored === "en" || stored === "ta" || stored === "hi" || stored === "te" || stored === "ml")
    ) {
      return stored as SupportedLanguage;
    }
  } catch {
    // In environments where localStorage is restricted, fallback gracefully
  }
  return "en";
}

export function CareProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<CareSession[]>([]);
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);
  const [travel, setTravel] = useState<number | null>(0);
  const [food, setFood] = useState<number | null>(0);
  const [days, setDays] = useState(2);

  const [bookingConsultant, setBookingConsultant] = useState<Consultant | null>(null);
  const [credentialConsultant, setCredentialConsultant] = useState<Consultant | null>(null);
  const [videoConsultant, setVideoConsultant] = useState<Consultant | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Synchronize document lang attribute and localStorage on language changes
  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("therapeace_language", lang);
        window.localStorage.setItem("therapease_language", lang);
        document.documentElement.lang = lang;
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const addSession = (
    consultantName: string,
    date: string,
    time: string,
    details?: CarePackageDetails,
  ) => {
    setSessions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        consultant: consultantName,
        date,
        time,
        status: "Requested",
        ...details,
      },
    ]);
  };

  const markAttended = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Completed" as const } : s)),
    );
  };

  const t = (path: string, params?: Record<string, string | number>) => {
    return translate(language, path, params);
  };

  const currentTranslations = (translations[language] || translations.en) as TranslationDictionary;
  const currentSiteText = siteText[language] || siteText.en;

  return (
    <CareContext.Provider
      value={{
        sessions,
        setSessions,
        addSession,
        markAttended,
        language,
        setLanguage,
        t,
        translations: currentTranslations,
        travel,
        setTravel,
        food,
        setFood,
        days,
        setDays,
        bookingConsultant,
        setBookingConsultant,
        credentialConsultant,
        setCredentialConsultant,
        videoConsultant,
        setVideoConsultant,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      <SiteTextContext.Provider value={currentSiteText}>
        {children}

        {/* Shared Modals accessible from any page */}
        {bookingConsultant && (
          <BookingModal
            c={bookingConsultant}
            language={language}
            onLanguageChange={setLanguage}
            initialTravel={travel}
            initialFood={food}
            initialDays={days}
            onRequest={(date, time, details) => {
              addSession(bookingConsultant.name, date, time, details);
            }}
            onClose={() => setBookingConsultant(null)}
          />
        )}

        {credentialConsultant && (
          <CredentialModal
            consultant={credentialConsultant}
            onClose={() => setCredentialConsultant(null)}
            onBook={() => {
              const chosen = credentialConsultant;
              setCredentialConsultant(null);
              setBookingConsultant(chosen);
            }}
          />
        )}

        {videoConsultant && (
          <IntroVideoModal
            consultant={videoConsultant}
            onClose={() => setVideoConsultant(null)}
            onBook={() => {
              const chosen = videoConsultant;
              setVideoConsultant(null);
              setBookingConsultant(chosen);
            }}
          />
        )}
      </SiteTextContext.Provider>
    </CareContext.Provider>
  );
}

export function useCare(): CareContextType {
  const context = useContext(CareContext);
  if (!context) {
    // Graceful fallback when rendered outside CareProvider (e.g. in isolated unit tests)
    return {
      sessions: [],
      setSessions: () => {},
      addSession: () => {},
      markAttended: () => {},
      language: "en",
      setLanguage: () => {},
      t: (path: string, params?: Record<string, string | number>) => translate("en", path, params),
      translations: translations.en,
      travel: 0,
      setTravel: () => {},
      food: 0,
      setFood: () => {},
      days: 2,
      setDays: () => {},
      bookingConsultant: null,
      setBookingConsultant: () => {},
      credentialConsultant: null,
      setCredentialConsultant: () => {},
      videoConsultant: null,
      setVideoConsultant: () => {},
      mobileMenuOpen: false,
      setMobileMenuOpen: () => {},
    };
  }
  return context;
}

export function useTranslation() {
  const { language, setLanguage, t, translations } = useCare();
  return { language, setLanguage, t, translations };
}
