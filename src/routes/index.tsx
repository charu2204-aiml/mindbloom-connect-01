import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Search,
  Sparkles,
  Package,
  ClipboardCheck,
  Info,
  Car,
  Navigation,
  Utensils,
  Wind,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Footer } from "@/components/Footer";
import { useCare } from "@/context/CareContext";
import { useSiteText } from "@/lib/site-language";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TheraPeace — Find trusted in-person therapists in India" },
      {
        name: "description",
        content:
          "Verified clinical psychologists near you with intro videos, licence proof, transparent fees, travel & food packages.",
      },
      { property: "og:title", content: "TheraPeace — Trusted in-person therapy in India" },
      {
        property: "og:description",
        content: "Verified therapists, affordable fees and complete care packages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featureConfig = [
  { id: "consultants", to: "/consultants", icon: Search },
  { id: "howItWorks", to: "/how-it-works", icon: Sparkles },
  { id: "foodTravel", to: "/food-travel", icon: Utensils },
  { id: "packages", to: "/packages", icon: Package },
  { id: "care", to: "/care", icon: ClipboardCheck },
  { id: "rider", to: "/rider", icon: Car },
  { id: "tracking", to: "/tracking", icon: Navigation },
  { id: "relax", to: "/relax", icon: Wind },
  { id: "about", to: "/about", icon: Info },
] as const;

function Index() {
  const { t, translations } = useCare();
  const site = useSiteText();

  // Smooth scroll support for hash anchors
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const el = document.getElementById(hash);
      if (el) {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        requestAnimationFrame(() => {
          el.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        });
      }
    }
  }, []);

  const trustItems = translations.essence?.trust || [
    { title: "100% RCI-verified", desc: "Every licence is checked before listing" },
    { title: "Confidential", desc: "Private, secure and judgement-free" },
    { title: "Transparent pricing", desc: "₹800 to premium packages — no hidden fees" },
    { title: "24/7 safety net", desc: "Crisis words connect you to Tele-MANAS 14416" },
  ];

  return (
    <div className="overflow-x-hidden pb-24 md:pb-12">
      {/* Hero Section */}
      <section className="bg-soft border-b border-border/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
          <div>
            <span className="rounded-full bg-card px-3.5 py-1 text-xs font-semibold text-primary shadow-xs border">
              {t("hero.badge")}
            </span>
            <h1 className="mt-5 text-4xl leading-tight md:text-5xl lg:text-6xl font-display">
              {t("hero.titleBefore")}{" "}
              <em className="text-primary italic">{t("hero.titleTrust")}</em>.
            </h1>
            <p className="mt-5 max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("hero.sub")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/consultants"
                className="btn-primary !px-5 !py-3 inline-flex items-center gap-2"
              >
                <span>{t("hero.searchBtn")}</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link to="/how-it-works" className="btn-ghost !px-5 !py-3">
                {t("hero.howBtn")}
              </Link>
            </div>
          </div>
          <img
            src={hero}
            alt="Calm therapy session"
            width={1024}
            height={1024}
            className="aspect-square w-full rounded-[2rem] object-cover shadow-soft border"
          />
        </div>
      </section>

      {/* Why TheraPeace / Essence */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {t("essence.badge")}
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-semibold">
            {t("essence.title")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("essence.body")}
          </p>
        </div>

        {/* 4 Trust Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border bg-card p-6 shadow-xs transition hover:border-primary/40"
            >
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <CheckCircle2 className="size-4" />
                <span>{item.title}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid: 9 Dedicated Hub Destinations */}
      <section className="bg-muted/40 border-y py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("featureGrid.badge")}
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-semibold">
              {t("featureGrid.title")}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureConfig.map((feat) => {
              const Icon = feat.icon;
              const title = t(`featureGrid.${feat.id}.title`);
              const desc = t(`featureGrid.${feat.id}.desc`);
              const tag = t(`featureGrid.${feat.id}.tag`);

              return (
                <Link
                  key={feat.id}
                  to={feat.to}
                  className="group relative flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="grid size-12 place-items-center rounded-xl bg-soft text-primary transition-transform group-hover:scale-110">
                        <Icon className="size-6" />
                      </div>
                      <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                        {tag}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary pt-2 border-t border-border/50">
                    <span>Explore</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-center">
          {site.faq.title}
        </h2>
        <div className="mt-8 space-y-4">
          {site.faq.items.map(([question, answer], index) => (
            <details
              key={index}
              className="rounded-2xl border bg-card p-5 shadow-xs transition-colors open:border-primary/40"
            >
              <summary className="cursor-pointer text-base font-semibold text-foreground">
                {question}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Join As Licensed Psychologist */}
      <section className="bg-soft border-t border-border/40 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold">{site.join.title}</h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {site.join.text}
          </p>
          <div className="mt-6">
            <a
              href="mailto:care@therapeace.in"
              className="btn-primary !px-6 !py-3 inline-flex items-center gap-2"
            >
              <span>{site.join.cta}</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
