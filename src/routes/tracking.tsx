import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "lucide-react";
import { LiveTracking } from "@/components/LiveTracking";
import { useCare } from "@/context/CareContext";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: "Live Tracking Interface — TheraPeace Transit" },
      {
        name: "description",
        content:
          "Track your upcoming therapy visit route in real time with arrival estimates, route visualization, and trip status updates.",
      },
      { property: "og:title", content: "Live Tracking" },
    ],
  }),
  component: TrackingPage,
});

function TrackingPage() {
  const { sessions, t } = useCare();

  return (
    <div className="pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <Navigation className="size-3.5" />
            <span>{t("tracking.badge")}</span>
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            {t("tracking.title")}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{t("tracking.sub")}</p>
        </div>

        {/* Embedded LiveTracking Component */}
        <div className="mt-8">
          <LiveTracking sessions={sessions} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
