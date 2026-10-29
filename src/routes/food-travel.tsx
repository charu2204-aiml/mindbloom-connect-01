import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Utensils, Car, Sparkles, Check } from "lucide-react";
import { consultants, travelPackages, foodPackages, type Consultant } from "@/data/consultants";
import { calculatePackageTotal } from "@/lib/care-journey";
import { useCare } from "@/context/CareContext";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/food-travel")({
  head: () => ({
    meta: [
      { title: "Food & Travel Packages — TheraPeace Logistics" },
      {
        name: "description",
        content:
          "Customize your therapy travel and nutritional care packages. Itemized pricing for local cabs, intercity transit, and balanced daily meals.",
      },
      { property: "og:title", content: "Food & Travel Packages" },
    ],
  }),
  component: FoodTravelPage,
});

function FoodTravelPage() {
  const { travel, setTravel, food, setFood, days, setDays, setBookingConsultant, t } = useCare();
  const [selectedConsultantId, setSelectedConsultantId] = useState(consultants[0]?.id ?? "1");

  const selectedConsultant: Consultant | null = useMemo(
    () => consultants.find((c) => c.id === selectedConsultantId) ?? consultants[0] ?? null,
    [selectedConsultantId],
  );
  const sessionFee = selectedConsultant?.fee ?? 0;

  const travelPrice = travel !== null ? (travelPackages[travel]?.price ?? 0) : 0;
  const foodPrice = food !== null ? (foodPackages[food]?.perDay ?? 0) : 0;
  const total = calculatePackageTotal(sessionFee, travelPrice, foodPrice, food !== null ? days : 0);

  return (
    <div className="pb-24 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary inline-flex items-center gap-1.5">
              <Utensils className="size-3.5" />
              <span>{t("foodTravel.badge")}</span>
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-display leading-tight">
              {t("foodTravel.title")}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
              {t("foodTravel.sub")}
            </p>
          </div>
          <div className="rounded-xl border bg-card/60 px-3 py-2 text-xs text-muted-foreground backdrop-blur sm:max-w-xs shrink-0">
            <span className="font-semibold text-foreground">
              {t("foodTravel.protoNoticeTitle")}
            </span>{" "}
            {t("foodTravel.protoNoticeBody")}
          </div>
        </div>

        {/* Interactive Builder Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Travel Section */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base">{t("foodTravel.travelTitle")}</h3>
                  <p className="text-xs text-muted-foreground">{t("foodTravel.travelSub")}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setTravel(null)}
                  aria-pressed={travel === null}
                  className={`rounded-2xl border-2 bg-card p-4 text-left transition-all ${
                    travel === null
                      ? "border-primary ring-2 ring-primary/20 shadow-xs"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{t("foodTravel.noTravel")}</p>
                    <span className="text-xs font-semibold rounded bg-muted px-2 py-0.5">
                      {t("foodTravel.noTravelPrice")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("foodTravel.noTravelDesc")}
                  </p>
                </button>

                {travelPackages.map((tr, i) => (
                  <button
                    key={tr.name}
                    type="button"
                    onClick={() => setTravel(i)}
                    aria-pressed={travel === i}
                    className={`rounded-2xl border-2 bg-card p-4 text-left transition-all ${
                      travel === i
                        ? "border-primary ring-2 ring-primary/20 shadow-xs"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{tr.name}</p>
                      <span className="text-xs font-semibold text-primary">
                        ₹{tr.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tr.range} · {tr.mode}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Food Section */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base">{t("foodTravel.foodTitle")}</h3>
                  <p className="text-xs text-muted-foreground">{t("foodTravel.foodSub")}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setFood(null)}
                  aria-pressed={food === null}
                  className={`rounded-2xl border-2 bg-card p-4 text-left transition-all ${
                    food === null
                      ? "border-primary ring-2 ring-primary/20 shadow-xs"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{t("foodTravel.noFood")}</p>
                    <span className="text-xs font-semibold rounded bg-muted px-2 py-0.5">
                      {t("foodTravel.noFoodPrice")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t("foodTravel.noFoodDesc")}</p>
                </button>

                {foodPackages.map((f, i) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setFood(i)}
                    aria-pressed={food === i}
                    className={`rounded-2xl border-2 bg-card p-4 text-left transition-all ${
                      food === i
                        ? "border-primary ring-2 ring-primary/20 shadow-xs"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{f.name}</p>
                      <span className="text-xs font-semibold text-primary">
                        ₹{f.perDay}
                        {t("common.perDay")}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                  </button>
                ))}
              </div>

              {food !== null && (
                <div className="mt-4 rounded-xl border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="stay-days-input" className="text-xs font-semibold">
                        {t("foodTravel.stayDays")}
                      </label>
                      <p className="text-[11px] text-muted-foreground">
                        {t("foodTravel.stayDaysSub")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        id="stay-days-input"
                        type="number"
                        min={1}
                        max={14}
                        value={days}
                        onChange={(e) => setDays(Math.max(1, Math.min(14, +e.target.value)))}
                        className="input-field w-20 text-center font-bold"
                      />
                      <span className="text-xs text-muted-foreground font-medium">days</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Package Calculation Summary Sidebar */}
          <div>
            <div className="sticky top-20 rounded-2xl border bg-card p-6 shadow-soft space-y-5">
              <div>
                <h3 className="font-semibold text-lg">{t("foodTravel.summaryTitle")}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{t("foodTravel.summarySub")}</p>
              </div>

              {/* Consultant selector for estimation */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                  Select Therapist
                </label>
                <select
                  value={selectedConsultantId}
                  onChange={(e) => setSelectedConsultantId(e.target.value)}
                  className="input-field text-xs"
                >
                  {consultants.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.city}) — ₹{c.fee}
                    </option>
                  ))}
                </select>
              </div>

              {/* Itemized Line Items */}
              <div className="space-y-2.5 text-xs border-t border-b border-border/60 py-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("foodTravel.consultantLabel")}</span>
                  <span className="font-medium text-foreground">
                    ₹{sessionFee.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Travel ({travel !== null ? travelPackages[travel]?.name : "None"})
                  </span>
                  <span className="font-medium text-foreground">
                    ₹{travelPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Food ({food !== null ? `${foodPackages[food]?.name} × ${days}d` : "None"})
                  </span>
                  <span className="font-medium text-foreground">
                    ₹{(foodPrice * (food !== null ? days : 0)).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-sm text-foreground">
                  {t("foodTravel.totalLabel")}
                </span>
                <span className="font-display text-2xl font-bold text-primary">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <Button
                onClick={() => {
                  if (selectedConsultant) {
                    setBookingConsultant(selectedConsultant);
                  }
                }}
                className="btn-primary w-full !py-2.5 text-xs"
              >
                {t("foodTravel.bookPackageBtn")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
