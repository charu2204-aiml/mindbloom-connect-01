import { createFileRoute } from "@tanstack/react-router";
import { Car, ShieldAlert } from "lucide-react";
import { RiderDetails } from "@/components/RiderDetails";
import { useCare } from "@/context/CareContext";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/rider")({
  head: () => ({
    meta: [
      { title: "Rider & Travel Details — TheraPeace Care Logistics" },
      {
        name: "description",
        content:
          "View your assigned travel companion, vehicle model, masked licence registration, and contact details for in-person therapy visits.",
      },
      { property: "og:title", content: "Rider & Travel Details" },
    ],
  }),
  component: RiderPage,
});

function RiderPage() {
  const { sessions, t } = useCare();

  return (
    <div className="pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <Car className="size-3.5" />
            <span>{t("rider.badge")}</span>
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            {t("rider.title")}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{t("rider.sub")}</p>
        </div>

        {/* Embedded RiderDetails Component */}
        <div className="mt-8">
          <RiderDetails sessions={sessions} />
        </div>

        {/* Safety & Masking Disclosure */}
        <div className="mt-16 rounded-2xl border bg-card p-6 shadow-xs max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <ShieldAlert className="size-4" />
            <span>{t("rider.privacySafeguardsTitle")}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t("rider.privacySafeguardsDesc")}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
