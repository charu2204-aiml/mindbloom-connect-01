import { createFileRoute } from "@tanstack/react-router";
import { Wind, Heart } from "lucide-react";
import { BubblePop, Breathing } from "@/components/StressGame";
import { useCare } from "@/context/CareContext";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/relax")({
  head: () => ({
    meta: [
      { title: "Take a Breather — Relax & Stress Relief | TheraPeace" },
      {
        name: "description",
        content:
          "Gentle sensory stress-relief activities: pop calming bubbles and practice 4-4-4 box breathing with optional soft audio guidance.",
      },
      { property: "og:title", content: "Take a Breather — Relax" },
    ],
  }),
  component: RelaxPage,
});

function RelaxPage() {
  const { t, translations } = useCare();

  const groundingTips = translations.relax?.groundingTips || [
    "Notice 3 things you can see around you right now.",
    "Feel the contact of your feet against the floor.",
    "Take slow, unhurried breaths without forcing your body to feel any particular way.",
    "If you need human support right now, call Tele-MANAS on 14416 (free, 24/7 across India).",
  ];

  return (
    <div className="pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <Wind className="size-3.5" />
            <span>{t("relax.badge")}</span>
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            {t("relax.title")}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{t("relax.sub")}</p>
        </div>

        {/* Stress Game Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <BubblePop />
          <Breathing />
        </div>

        {/* Grounding Tips */}
        <div className="mt-16 rounded-2xl border bg-card p-6 md:p-8 shadow-xs max-w-3xl">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Heart className="size-5 text-primary" />
            <span>{t("relax.groundingTitle")}</span>
          </h3>
          <ul className="mt-4 space-y-2 text-xs text-muted-foreground list-disc pl-5 leading-relaxed">
            {groundingTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
