import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Check, ArrowRight, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useCare } from "@/context/CareContext";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Care Packages & Subscription — TheraPeace" },
      {
        name: "description",
        content:
          "Explore TheraPeace Care+ subscription and bundled care packages: follow-up reminders, aftercare guidance, and doorstep transit.",
      },
      { property: "og:title", content: "Care Packages & Subscription" },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  const { t, translations } = useCare();

  const packageTiers = translations.packages?.tiers || [
    {
      name: "Essential Follow-up",
      price: "₹800 – ₹1,500",
      period: "per session",
      desc: "Single consultant follow-up visit with intake continuity and digital reflection journal.",
      features: [
        "1 In-person follow-up session",
        "CareJourney reflection access",
        "Crisis helpline integration",
      ],
    },
    {
      name: "TheraPeace Care+",
      price: "₹299",
      period: "per month",
      desc: "Our continuity subscription keeping your healing on track between clinic visits.",
      features: [
        "Automatic reminders for your next scheduled follow-up session",
        "Personalised intake guidance and reflection notes between visits",
        "On-demand doubt-clearing messages directly with your consultant",
        "Priority companion dispatch and doorstep cab coordination",
      ],
    },
    {
      name: "Complete Care & Travel",
      price: "₹2,500 – ₹12,000",
      period: "bundled tier",
      desc: "Comprehensive logistics package bundling doorstep pickup, intercity travel, and nutrition.",
      features: [
        "Consultant appointment coordination",
        "Dedicated rider & verified cab pickup",
        "Nutritional wellness meal support",
        "Live tracking simulation",
      ],
    },
  ];

  return (
    <div className="pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <Package className="size-3.5" />
            <span>{t("packages.badge")}</span>
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            {t("packages.title")}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{t("packages.sub")}</p>
        </div>

        {/* Highlight Banner: Care+ Subscription */}
        <div className="mt-12 rounded-[2rem] bg-strong p-8 md:p-12 text-primary-foreground shadow-soft relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-semibold text-primary-foreground inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5" />
              <span>{t("packages.flagshipBadge")}</span>
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-display">
              {t("packages.carePlusTitle")}
            </h2>
            <p className="mt-3 text-base opacity-90 leading-relaxed">{t("packages.carePlusSub")}</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold">{t("packages.carePlusPrice")}</span>
              <span className="text-sm opacity-80">{t("packages.carePlusPeriod")}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/consultants"
                className="btn-primary !bg-card !text-foreground hover:!bg-card/90"
              >
                {t("packages.browseConsultants")}
              </Link>
              <Link
                to="/food-travel"
                className="btn-ghost !border-primary-foreground/40 !text-primary-foreground hover:!bg-primary-foreground/10"
              >
                {t("packages.exploreLogistics")}
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison Tiers */}
        <div className="mt-16">
          <div className="grid gap-6 md:grid-cols-3">
            {packageTiers.map((tier, idx) => {
              const isPopular = idx === 1; // Care+
              return (
                <div
                  key={tier.name}
                  className={`rounded-2xl border p-6 flex flex-col justify-between shadow-soft transition-all duration-200 ${
                    isPopular ? "border-primary bg-card ring-2 ring-primary/20 relative" : "bg-card"
                  }`}
                >
                  <div>
                    {isPopular && (
                      <span className="inline-block rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground mb-3">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-foreground">{tier.price}</span>
                      <span className="text-xs text-muted-foreground">{tier.period}</span>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      {tier.desc}
                    </p>

                    <div className="mt-6 space-y-2.5 border-t border-border/60 pt-4">
                      {tier.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-foreground">
                          <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      to={idx === 2 ? "/food-travel" : "/consultants"}
                      className={`btn-primary w-full text-xs text-center !py-2.5 inline-flex items-center justify-center gap-1.5 ${
                        !isPopular ? "!bg-card !text-foreground !border hover:!bg-muted" : ""
                      }`}
                    >
                      <span>
                        {idx === 2
                          ? t("packages.exploreLogistics")
                          : t("packages.browseConsultants")}
                      </span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
