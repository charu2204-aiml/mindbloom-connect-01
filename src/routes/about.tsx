import { createFileRoute, Link } from "@tanstack/react-router";
import { Info, CheckCircle2, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useCare } from "@/context/CareContext";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TheraPeace — Trusted in-person therapy in India" },
      {
        name: "description",
        content:
          "Why TheraPeace exists: uniting verified, RCI-registered clinical psychologists with transparent pricing and full care logistics.",
      },
      { property: "og:title", content: "About TheraPeace" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, translations } = useCare();

  const values = translations.about?.values || [
    {
      title: "100% Verified Practitioners",
      desc: "Every clinical psychologist on TheraPeace holds a verified Rehabilitation Council of India (RCI) registration.",
    },
    {
      title: "Honest & Upfront Fees",
      desc: "From ₹800 first consultations to complete multi-day logistics bundles, you see the exact cost before booking.",
    },
    {
      title: "Doorstep Travel & Meals",
      desc: "We coordinate travel and balanced daily meals so patients traveling from outside cities never worry about logistics.",
    },
    {
      title: "Continuity That Lasts",
      desc: "Our CareJourney portal ensures reflections, follow-ups, and doubt-clearing conversations remain uninterrupted.",
    },
  ];

  return (
    <div className="pb-24 md:pb-12">
      <div className="mx-auto max-w-5xl px-5 py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <Info className="size-3.5" />
            <span>{t("about.badge")}</span>
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            {t("about.title")}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{t("about.sub")}</p>
        </div>

        {/* Story Narrative Card */}
        <div className="mt-10 rounded-2xl border bg-card p-8 md:p-10 shadow-soft space-y-5 leading-relaxed text-muted-foreground">
          <h2 className="text-2xl font-display font-semibold text-foreground">
            {t("about.storyTitle")}
          </h2>
          <p>{t("about.storyP1")}</p>
          <p>{t("about.storyP2")}</p>
          <p>{t("about.storyP3")}</p>
          <div className="pt-2 border-t font-semibold text-foreground text-sm flex items-center gap-2 text-primary">
            <CheckCircle2 className="size-4" />
            <span>{t("about.storyTag")}</span>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border bg-card p-6 shadow-xs">
              <h3 className="text-base font-semibold text-primary flex items-center gap-2">
                <span>✓</span>
                <span>{v.title}</span>
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 rounded-3xl bg-soft border border-primary/20 p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-semibold">{t("about.ctaTitle")}</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">{t("about.ctaSub")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/consultants"
              className="btn-primary !px-5 !py-2.5 inline-flex items-center gap-2"
            >
              <span>{t("about.ctaBtn")}</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
