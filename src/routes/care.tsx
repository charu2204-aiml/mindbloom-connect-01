import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";
import { CareJourney } from "@/components/CareJourney";
import { useCare } from "@/context/CareContext";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/care")({
  head: () => ({
    meta: [
      { title: "Updates & Aftercare — TheraPeace CareJourney" },
      {
        name: "description",
        content:
          "Track your therapy journey, review scheduled appointment dates, write after-session reflections, and notice your daily check-in feelings.",
      },
      { property: "og:title", content: "Updates & Aftercare" },
    ],
  }),
  component: CarePage,
});

function CarePage() {
  const router = useRouter();
  const { sessions, setSessions, t, translations } = useCare();

  const handleBook = () => {
    router.navigate({ to: "/consultants" });
  };

  const guidance = translations.care?.guidancePillars || [
    {
      num: "1",
      title: "Make Room for Small Wins",
      desc: "Noticing even slight shifts in thoughts or responses between visits helps build resilience and self-awareness.",
    },
    {
      num: "2",
      title: "Write It Down",
      desc: "Jot questions or thoughts right away so you don’t have to keep track of them in your head until the next session.",
    },
    {
      num: "3",
      title: "No Judgment Check-ins",
      desc: "There is no pressure to feel hopeful or energetic every day. Every feeling is valid on your path to wellness.",
    },
  ];

  return (
    <div className="pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <ClipboardCheck className="size-3.5" />
            <span>{t("care.badge")}</span>
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            {t("care.title")}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{t("care.sub")}</p>
        </div>

        {/* Embedded CareJourney Experience */}
        <div className="mt-10">
          <CareJourney sessions={sessions} onSessionsChange={setSessions} onBook={handleBook} />
        </div>

        {/* Informational Guidance Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {guidance.map((g) => (
            <div key={g.num} className="rounded-2xl border bg-card p-6 shadow-xs">
              <div className="grid size-10 place-items-center rounded-xl bg-soft text-primary font-bold">
                {g.num}
              </div>
              <h3 className="mt-4 font-semibold text-base">{g.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
