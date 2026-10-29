import { useState } from "react";
import { type Consultant, travelPackages, foodPackages } from "@/data/consultants";
import { bookingLanguages, type BookingLanguage } from "@/data/booking-languages";
import { type CarePackageDetails, calculatePackageTotal } from "@/lib/care-journey";
import { Button } from "@/components/ui/button";

export function BookingModal({
  c,
  onClose,
  language,
  onLanguageChange,
  initialTravel = null,
  initialFood = null,
  initialDays = 2,
  onRequest,
}: {
  c: Consultant;
  onClose: () => void;
  language: BookingLanguage;
  onLanguageChange: (language: BookingLanguage) => void;
  initialTravel?: number | null;
  initialFood?: number | null;
  initialDays?: number;
  onRequest: (date: string, time: string, details: CarePackageDetails) => void;
}) {
  const [modalTravel, setModalTravel] = useState<number | null>(initialTravel);
  const [modalFood, setModalFood] = useState<number | null>(initialFood);
  const [modalDays, setModalDays] = useState(initialDays);
  const [done, setDone] = useState(false);
  const [bookedSummary, setBookedSummary] = useState<{
    date: string;
    time: string;
    details: CarePackageDetails;
  } | null>(null);

  const labels = bookingLanguages[language];

  const travelItem = modalTravel !== null ? travelPackages[modalTravel] : null;
  const foodItem = modalFood !== null ? foodPackages[modalFood] : null;
  const travelCost = travelItem?.price ?? 0;
  const foodCost = (foodItem?.perDay ?? 0) * (modalFood !== null ? modalDays : 0);
  const modalTotal = calculatePackageTotal(
    c.fee,
    travelCost,
    foodItem?.perDay ?? 0,
    modalFood !== null ? modalDays : 0,
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-plum/50 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={c.name}
        lang={language}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-6 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        {done ? (
          <div className="py-6 text-center space-y-4">
            <p className="text-4xl">🌸</p>
            <div>
              <h3 className="text-2xl font-semibold">{labels.requested}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {labels.prototypeDisclaimer} {c.name}.
              </p>
            </div>

            <div className="rounded-xl border bg-muted/40 p-4 text-left text-xs space-y-2.5">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold text-foreground text-sm">{c.name}</p>
                  <p className="text-muted-foreground">
                    {c.title} · 📍 {c.city}
                  </p>
                </div>
                <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                  Requested (Demo)
                </span>
              </div>
              <p className="text-muted-foreground">
                📅 <strong className="text-foreground">Schedule:</strong> {bookedSummary?.date} at{" "}
                {bookedSummary?.time}
              </p>
              <p className="text-muted-foreground">
                🚗 <strong className="text-foreground">{labels.travelLabel}:</strong>{" "}
                {bookedSummary?.details.travelPackage
                  ? `${bookedSummary.details.travelPackage} (₹${bookedSummary.details.travelPrice?.toLocaleString("en-IN")})`
                  : labels.noTravel}
              </p>
              <p className="text-muted-foreground">
                🥗 <strong className="text-foreground">{labels.foodLabel}:</strong>{" "}
                {bookedSummary?.details.foodPackage
                  ? `${bookedSummary.details.foodPackage} × ${bookedSummary.details.days}d (₹${((bookedSummary.details.foodPrice ?? 0) * (bookedSummary.details.days ?? 1)).toLocaleString("en-IN")})`
                  : labels.noFood}
              </p>
              <div className="border-t pt-2 flex justify-between font-bold text-sm text-foreground">
                <span>{labels.estimatedTotal}:</span>
                <span className="text-primary">
                  ₹{bookedSummary?.details.totalEstimatedCost?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground">
              Review your appointment and logistics anytime in{" "}
              <strong className="text-foreground">Updates & Aftercare</strong>.
            </p>

            <Button onClick={onClose} className="w-full">
              {labels.done}
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const date = String(data.get("date"));
              const time = String(data.get("time"));
              const details: CarePackageDetails = {
                travelPackage: travelItem ? travelItem.name : undefined,
                travelPrice: travelCost,
                foodPackage: foodItem ? foodItem.name : undefined,
                foodPrice: foodItem?.perDay ?? 0,
                days: modalFood !== null ? modalDays : undefined,
                totalEstimatedCost: modalTotal,
              };
              onRequest(date, time, details);
              setBookedSummary({ date, time, details });
              setDone(true);
            }}
            className="space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl">{c.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {c.title} · 📍 {c.city}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close booking"
                onClick={onClose}
              >
                ×
              </Button>
            </div>

            <p className="rounded-xl bg-muted p-3 text-sm">
              {c.bio} <b className="text-primary">First session ₹{c.fee}</b>
            </p>

            <select
              aria-label="Form language"
              className="input-field"
              value={language}
              onChange={(e) => {
                const value = e.target.value;
                if (value in bookingLanguages) onLanguageChange(value as BookingLanguage);
              }}
            >
              {Object.entries(bookingLanguages).map(([code, value]) => (
                <option key={code} value={code}>
                  {value.name}
                </option>
              ))}
            </select>

            <p className="text-xs text-muted-foreground">{labels.note}</p>

            <label className="block text-sm">
              {labels.yourName}
              <input
                name="name"
                required
                autoComplete="name"
                className="input-field mt-1"
                placeholder={labels.yourName}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="min-w-0 text-sm">
                {labels.date}
                <input name="date" required type="date" className="input-field mt-1 min-w-0" />
              </label>
              <label className="min-w-0 text-sm">
                {labels.time}
                <input name="time" required type="time" className="input-field mt-1 min-w-0" />
              </label>
            </div>

            <label className="block text-sm">
              {labels.concern}
              <textarea
                name="concern"
                required
                rows={3}
                className="input-field mt-1"
                placeholder={labels.concern}
              />
            </label>

            {/* Care Logistics Packages Customization */}
            <div className="rounded-xl border bg-muted/30 p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-xs uppercase tracking-wider text-primary">
                  {labels.packagesTitle}
                </p>
                <span className="text-[10px] text-muted-foreground">Adjustable</span>
              </div>

              <label className="block text-xs">
                <span className="font-medium text-foreground">{labels.travelLabel}</span>
                <select
                  aria-label={labels.travelLabel}
                  className="input-field mt-1 text-xs"
                  value={modalTravel === null ? "none" : modalTravel}
                  onChange={(e) =>
                    setModalTravel(e.target.value === "none" ? null : Number(e.target.value))
                  }
                >
                  <option value="none">{labels.noTravel}</option>
                  {travelPackages.map((t, i) => (
                    <option key={t.name} value={i}>
                      {t.name} ({t.range}) — ₹{t.price.toLocaleString("en-IN")}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="block text-xs">
                  <span className="font-medium text-foreground">{labels.foodLabel}</span>
                  <select
                    aria-label={labels.foodLabel}
                    className="input-field mt-1 text-xs"
                    value={modalFood === null ? "none" : modalFood}
                    onChange={(e) =>
                      setModalFood(e.target.value === "none" ? null : Number(e.target.value))
                    }
                  >
                    <option value="none">{labels.noFood}</option>
                    {foodPackages.map((f, i) => (
                      <option key={f.name} value={i}>
                        {f.name} — ₹{f.perDay}/day
                      </option>
                    ))}
                  </select>
                </label>

                {modalFood !== null && (
                  <label className="block text-xs">
                    <span className="font-medium text-foreground">{labels.stayDuration}</span>
                    <input
                      type="number"
                      min={1}
                      max={14}
                      value={modalDays}
                      onChange={(e) => setModalDays(Math.max(1, Math.min(14, +e.target.value)))}
                      className="input-field mt-1 text-xs"
                    />
                  </label>
                )}
              </div>

              {/* Itemized breakdown */}
              <div className="border-t border-border/60 pt-2 text-xs space-y-1 text-muted-foreground">
                <div className="flex justify-between">
                  <span>{labels.breakdownConsultant}</span>
                  <span className="text-foreground">₹{c.fee.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {labels.breakdownTravel} ({travelItem ? travelItem.name : "None"})
                  </span>
                  <span className="text-foreground">₹{travelCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {labels.breakdownFood} ({foodItem ? `${foodItem.name} × ${modalDays}d` : "None"}
                    )
                  </span>
                  <span className="text-foreground">₹{foodCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="border-t border-border/60 pt-1.5 flex justify-between font-bold text-foreground">
                  <span>{labels.estimatedTotal}</span>
                  <span className="text-primary text-sm">
                    ₹{modalTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <Button className="h-auto min-h-10 w-full whitespace-normal">
              {labels.submit} · ₹{modalTotal.toLocaleString("en-IN")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
