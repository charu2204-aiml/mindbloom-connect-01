import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Play, ShieldCheck, Search as SearchIcon, Award } from "lucide-react";
import { consultants, cities } from "@/data/consultants";
import { useCare } from "@/context/CareContext";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/consultants")({
  head: () => ({
    meta: [
      { title: "Find Your Consultant — Verified Therapists in India" },
      {
        name: "description",
        content:
          "Search and filter licensed clinical psychologists in India. Watch intro videos, view registration details, and book in-person consultations.",
      },
    ],
  }),
  component: ConsultantsPage,
});

function ConsultantsPage() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [maxFee, setMaxFee] = useState(4000);

  const { t, setBookingConsultant, setCredentialConsultant, setVideoConsultant } = useCare();

  const list = useMemo(
    () =>
      consultants
        .filter((c) =>
          (c.name + c.title + c.focus.join(" ")).toLowerCase().includes(q.toLowerCase()),
        )
        .filter((c) => !city || c.city === city)
        .filter((c) => c.fee <= maxFee)
        .sort((a, b) => b.fee - a.fee),
    [q, city, maxFee],
  );

  return (
    <div className="pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
            <SearchIcon className="size-3.5" />
            <span>{t("consultants.badge")}</span>
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
            {t("consultants.title")}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            {t("consultants.sub")}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 grid gap-4 rounded-2xl border bg-card p-5 shadow-soft md:grid-cols-3 items-center">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
              {t("consultants.searchLabel")}
            </label>
            <input
              className="input-field"
              placeholder={t("consultants.searchPh")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
              {t("consultants.locationLabel")}
            </label>
            <select
              aria-label={t("consultants.locationLabel")}
              className="input-field"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">{t("consultants.allLocations")}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-1">
              <span>{t("consultants.maxFeeLabel")}</span>
              <strong className="text-foreground">₹{maxFee.toLocaleString("en-IN")}</strong>
            </div>
            <input
              type="range"
              min={500}
              max={4000}
              step={100}
              value={maxFee}
              onChange={(e) => setMaxFee(+e.target.value)}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            <strong className="text-foreground font-semibold">{list.length}</strong>{" "}
            {t("consultants.countSuffix")}
          </span>
        </div>

        {/* Consultants Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <article
              key={c.id}
              className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-soft transition-all duration-200 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {c.title} · 📍 {c.city}
                    </p>
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground shrink-0">
                    {c.experience} {t("consultants.years")}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded bg-soft px-2 py-0.5 text-[11px] font-medium text-primary">
                    <ShieldCheck className="size-3" />
                    <span>{t("consultants.licensed")}</span>
                  </span>
                  <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {t("consultants.inPerson")}
                  </span>
                  <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    🗣 {c.languages.join(", ")}
                  </span>
                </div>

                <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {c.bio}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {c.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-md border bg-muted/30 px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-muted-foreground">
                    {t("consultants.firstConsult")}
                  </span>
                  <strong className="text-lg font-bold text-primary">
                    ₹{c.fee.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setCredentialConsultant(c)}
                    className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-1"
                  >
                    <Award className="size-3.5 text-primary" />
                    <span>{t("consultants.credentials")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoConsultant(c)}
                    className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-1"
                  >
                    <Play className="size-3 text-primary" />
                    <span>{t("consultants.introVideo")}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingConsultant(c)}
                  className="btn-primary w-full !py-2 text-xs"
                >
                  {t("consultants.viewBook")}
                </button>
              </div>
            </article>
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-12 rounded-2xl border bg-card p-12 text-center shadow-soft">
            <p className="text-base text-muted-foreground max-w-md mx-auto">
              {t("consultants.noMatch")}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
