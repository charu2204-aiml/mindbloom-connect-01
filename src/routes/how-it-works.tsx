import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { TherapyMoments } from "@/components/TherapyMoments";
import { TherapyClips } from "@/components/TherapyClips";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — TheraPeace Care Discovery" },
      {
        name: "description",
        content:
          "Learn how TheraPeace helps you discover licensed clinical psychologists with intro videos, licence proof, and transparent logistics.",
      },
      { property: "og:title", content: "How TheraPeace Works" },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  const { t, translations } = useCare();

  const steps = translations.howItWorks?.steps || [
    {
      num: "1",
      title: "Search & Filter",
      desc: "Filter licensed clinical psychologists by name, city, languages, and maximum session fee.",
    },
    {
      num: "2",
      title: "Verify Credentials",
      desc: "Watch intro videos, check RCI registration numbers, clinic location, and professional qualifications.",
    },
    {
      num: "3",
      title: "Request Your Visit",
      desc: "Pick your preferred date & time, describe your concern in any language, and request an appointment.",
    },
    {
      num: "4",
      title: "Bundled Logistics",
      desc: "Add optional doorstep cab or regional transit and nutritional meal packages for a transparent total.",
    },
    {
      num: "5",
      title: "Continuity & Aftercare",
      desc: "Reflect after each visit, log check-in moods, and seamlessly request follow-up sessions.",
    },
  ];

  const trustPillars = translations.howItWorks?.trustPillars || [
    {
      title: "100% RCI-verified",
      desc: "Every registration number is recorded and checked before listing.",
    },
    {
      title: "Confidential & Safe",
      desc: "Private, secure, and judgement-free in-person environment.",
    },
    {
      title: "Transparent pricing",
      desc: "From ₹800 sessions to complete care packages — zero hidden fees.",
    },
    {
      title: "24/7 Safety Net",
      desc: "Instant crisis support connecting you to Tele-MANAS 14416.",
    },
  ];

  return (
    <div className="pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5" />
            <span>{t("howItWorks.badge")}</span>
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            {t("howItWorks.title")}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            {t("howItWorks.sub")}
          </p>
        </div>

        {/* 5-Step Process */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <div
              key={s.num}
              className="rounded-2xl border bg-card p-6 shadow-soft flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <span className="grid size-10 place-items-center rounded-xl bg-strong text-sm font-bold text-primary-foreground shadow-xs">
                  {s.num}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Guarantees */}
        <div className="mt-16 rounded-3xl bg-soft p-8 md:p-12 border border-primary/20">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <ShieldCheck className="size-5" />
            <span>{t("howItWorks.trustTitle")}</span>
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-display font-semibold">
            {t("essence.title")}
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((p, idx) => (
              <div key={idx} className="rounded-2xl bg-card p-5 border shadow-xs">
                <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{p.title}</span>
                </h4>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-primary/20 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground max-w-md">
              Need immediate mental health triage? Speak to qualified counselors on the Tele-MANAS
              national helpline.
            </p>
            <a href="tel:14416" className="btn-primary !px-4 !py-2 text-xs">
              Call Tele-MANAS 14416
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Therapy Demonstrations & Reflections */}
      <TherapyClips />
      <TherapyMoments />

      <Footer />
    </div>
  );
}
