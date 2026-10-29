import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { X, Globe, PhoneCall } from "lucide-react";
import { SIDEBAR_ITEMS } from "@/data/navigation";
import { useCare } from "@/context/CareContext";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/data/translations";
import { Button } from "@/components/ui/button";

const navKeyMap: Record<string, string> = {
  home: "nav.home",
  "how-it-works": "nav.howItWorks",
  consultants: "nav.consultants",
  packages: "nav.packages",
  care: "nav.care",
  about: "nav.about",
  rider: "nav.rider",
  tracking: "nav.tracking",
  "food-travel": "nav.foodTravel",
  relax: "nav.relax",
};

export function Sidebar() {
  const location = useLocation();
  const { language, setLanguage, t, mobileMenuOpen, setMobileMenuOpen } = useCare();

  const currentPath = location.pathname;

  // Close mobile drawer on route change or Escape key
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath, setMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  const renderNavList = (isMobile = false) => (
    <ul className="space-y-1.5 px-3 py-2">
      {SIDEBAR_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.to === "/"
            ? currentPath === "/"
            : currentPath === item.to || currentPath.startsWith(item.to + "/");

        const labelKey = navKeyMap[item.id] || item.name;
        const localizedName = t(labelKey) || item.name;

        return (
          <li key={item.id}>
            <Link
              to={item.to}
              onClick={() => {
                if (isMobile) setMobileMenuOpen(false);
                if (isActive) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              aria-current={isActive ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-primary/15 text-primary font-semibold shadow-xs"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <Icon
                className={`size-4.5 shrink-0 transition-transform duration-150 group-hover:scale-110 ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span className="truncate">{localizedName}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside
        aria-label="Main sidebar navigation"
        className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:left-0 z-30 border-r bg-card/95 backdrop-blur-md shadow-xs select-none"
      >
        {/* Brand / Logo Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
          >
            <span className="text-2xl" role="img" aria-label="TheraPeace Logo">
              🌸
            </span>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-primary block leading-none">
                TheraPeace
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
                {t("common.tagline")}
              </span>
            </div>
          </Link>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto py-3">
          <div className="px-5 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
            {t("nav.carePlatform")}
          </div>
          {renderNavList(false)}
        </div>

        {/* Bottom Tools & Crisis Line */}
        <div className="border-t p-4 space-y-3 bg-muted/20">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-muted-foreground shrink-0" />
            <select
              aria-label={t("nav.siteLanguage")}
              className="w-full rounded-lg border bg-card px-2.5 py-1.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value as SupportedLanguage);
              }}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          <a
            href="tel:14416"
            className="flex items-center gap-2 rounded-xl bg-soft border border-primary/20 px-3 py-2 text-xs text-primary transition-all hover:bg-primary/10"
          >
            <PhoneCall className="size-3.5 shrink-0" />
            <div className="leading-tight">
              <span className="font-semibold block">{t("common.teleManas")}</span>
              <span className="text-[10px] text-muted-foreground">{t("common.freeHelpline")}</span>
            </div>
          </a>
        </div>
      </aside>

      {/* Mobile Drawer (Slide-out from left) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-plum/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-card p-4 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200"
          >
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 font-display text-xl text-primary font-bold"
                >
                  <span>🌸</span>
                  <span>TheraPeace</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full"
                  aria-label={t("nav.closeMenu")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>

              {renderNavList(true)}
            </div>

            <div className="border-t pt-4 space-y-3 mt-4">
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-muted-foreground shrink-0" />
                <select
                  aria-label={t("nav.siteLanguage")}
                  className="w-full rounded-lg border bg-card px-2.5 py-1.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value as SupportedLanguage);
                  }}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>

              <a
                href="tel:14416"
                className="flex items-center gap-2 rounded-xl bg-soft border border-primary/20 px-3 py-2 text-xs text-primary"
              >
                <PhoneCall className="size-3.5 shrink-0" />
                <div className="leading-tight">
                  <span className="font-semibold block">{t("common.teleManas")}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {t("common.freeHelpline")}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function MobileTopNav() {
  const { setMobileMenuOpen, language, setLanguage, t } = useCare();

  return (
    <header className="sticky top-0 z-20 flex md:hidden items-center justify-between border-b bg-background/90 backdrop-blur px-4 py-3">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label={t("nav.openMenu")}
          className="grid size-9 place-items-center rounded-lg border bg-card text-foreground transition hover:bg-muted"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link
          to="/"
          className="font-display text-xl font-bold text-primary flex items-center gap-1.5"
        >
          <span>🌸</span>
          <span>TheraPeace</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <select
          aria-label={t("nav.siteLanguage")}
          className="rounded-md border bg-card px-2 py-1 text-xs"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value as SupportedLanguage);
          }}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>
        <Link to="/consultants" className="btn-primary !px-3 !py-1 text-xs">
          {t("nav.findShort")}
        </Link>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <MobileTopNav />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
