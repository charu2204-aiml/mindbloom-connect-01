import { useState, useEffect, useRef } from "react";
import {
  Car,
  Phone,
  ShieldAlert,
  CalendarDays,
  Star,
  CheckCircle2,
  X,
  ArrowRight,
  Info,
} from "lucide-react";
import { sampleRider, type RiderAssignment } from "@/data/rider";
import { type CareSession } from "@/lib/care-journey";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export function RiderDetails({ sessions }: { sessions: CareSession[] }) {
  const [showSamplePreview, setShowSamplePreview] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const contactCloseRef = useRef<HTMLButtonElement>(null);
  const { t, translations } = useCare();

  // Active appointment if one has been booked in prototype state
  const latestSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;
  const isAssigned = !!latestSession || showSamplePreview;
  const rider: RiderAssignment = sampleRider;

  useEffect(() => {
    if (!contactModalOpen) return;
    contactCloseRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contactModalOpen]);

  const pillars = translations.rider?.pillars || [
    {
      title: "Direct Clinic Coordination",
      desc: "Your companion coordinates directly with the clinic to ensure punctuality.",
    },
    {
      title: "Quiet & Respectful Transit",
      desc: "Trained to provide a calm, peaceful atmosphere suited for therapy preparation.",
    },
    {
      title: "No Ride-Sharing",
      desc: "Exclusive private transit — no unexpected passengers or multi-stop diversions.",
    },
  ];

  return (
    <section id="rider" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t("rider.badge")}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl">{t("rider.title")}</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">{t("rider.sub")}</p>
        </div>

        {/* State Toggle for prototype inspection */}
        <div className="flex items-center gap-2">
          {latestSession ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              <CheckCircle2 className="size-3.5" />
              <span>Active Booking Detected</span>
            </span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSamplePreview((prev) => !prev)}
              className="text-xs rounded-full"
            >
              {showSamplePreview ? "Reset to Default (Unassigned)" : "Preview Sample Assignment"}
            </Button>
          )}
        </div>
      </div>

      {!isAssigned ? (
        /* Empty State: Not Assigned */
        <div className="mt-8 rounded-2xl border bg-card p-8 md:p-12 text-center shadow-soft">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-soft text-primary">
            <Car className="size-8" />
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <span>Assignment Status:</span>{" "}
            <strong className="text-foreground">Not assigned</strong>
          </div>
          <h3 className="mt-4 text-2xl font-display font-semibold">
            No Transport Companion Assigned Yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            {t("rider.noCompanionDesc")}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/consultants";
                }
              }}
            >
              Find a Consultant to Book
            </Button>
            <Button variant="outline" onClick={() => setShowSamplePreview(true)}>
              Simulate Assignment (Demo)
            </Button>
          </div>
        </div>
      ) : (
        /* Assigned State */
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main Rider & Vehicle Card */}
          <div className="lg:col-span-2 rounded-2xl border bg-card p-6 md:p-8 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
              <div className="flex items-center gap-4">
                {/* Profile Placeholder */}
                <div className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary font-display font-bold text-xl border-2 border-primary/20">
                  {rider.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{rider.riderName}</h3>
                    <span className="inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                      <Star className="size-3 fill-secondary-foreground" />
                      {rider.rating}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {rider.experienceYears} {t("common.yearsExp")} · {t("rider.assignedCompanion")}
                  </p>
                  {latestSession && (
                    <p className="text-xs text-primary font-medium mt-1">
                      Assigned for session with <strong>{latestSession.consultant}</strong>
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">🗣 Hindi, Tamil, English</p>
                </div>
              </div>

              <Button
                onClick={() => setContactModalOpen(true)}
                className="btn-primary !px-4 inline-flex items-center gap-2 w-full sm:w-auto"
              >
                <Phone className="size-4" />
                <span>Contact Rider (Demo)</span>
              </Button>
            </div>

            {/* Vehicle Details */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {t("rider.vehicleDetailsTitle")}
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border bg-muted/30 p-3.5">
                  <span className="text-[11px] text-muted-foreground block">
                    {t("rider.vehicleModelLabel")}
                  </span>
                  <span className="font-semibold text-foreground text-sm mt-0.5 block">
                    {rider.vehicleModel}
                  </span>
                </div>
                <div className="rounded-xl border bg-muted/30 p-3.5">
                  <span className="text-[11px] text-muted-foreground block">
                    {t("rider.vehicleCategoryLabel")}
                  </span>
                  <span className="font-semibold text-foreground text-sm mt-0.5 block">
                    {rider.vehicleType}
                  </span>
                </div>
                <div className="rounded-xl border bg-muted/30 p-3.5">
                  <span className="text-[11px] text-muted-foreground block">
                    {t("rider.licensePlateLabel")}
                  </span>
                  <span className="font-mono font-bold text-foreground text-sm mt-0.5 block">
                    {rider.vehiclePlateMasked}
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">
                    {t("rider.maskedDemo")}
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {t("rider.driverVerificationTitle")}
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border bg-muted/30 p-3.5 flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-foreground block">
                      {t("rider.commercialLicenseLabel")}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground mt-0.5 block">
                      {rider.licenseMasked}
                    </span>
                    <span className="text-[11px] text-primary font-medium mt-1 block">
                      ✓ {t("rider.verifiedStatus")}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border bg-muted/30 p-3.5 flex items-start gap-3">
                  <ShieldAlert className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-foreground block">
                      {t("rider.policeBackgroundLabel")}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5 block">
                      {rider.verificationStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Care Assurance Panel */}
          <div className="space-y-6">
            <div className="rounded-2xl border bg-soft p-6 shadow-soft space-y-4">
              <h4 className="font-semibold text-base flex items-center gap-2">
                <Info className="size-4 text-primary" />
                <span>{t("rider.supportPillarsTitle")}</span>
              </h4>
              <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                {pillars.map((p, idx) => (
                  <div key={idx} className="border-t border-border/50 pt-2.5">
                    <strong className="text-foreground block">{p.title}</strong>
                    <p className="mt-0.5">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Link to Care Journey */}
            <div className="rounded-2xl border bg-card p-5 text-center shadow-xs">
              <p className="text-xs text-muted-foreground">
                Review this appointment in your private care space
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/care";
                  }
                }}
                className="mt-3 w-full text-xs"
              >
                View in Care Journey
                <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Masked Telephony Modal */}
      {contactModalOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-plum/50 backdrop-blur-xs p-4"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="w-full max-w-md rounded-2xl bg-card p-6 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 id="contact-modal-title" className="font-semibold text-lg">
                Contact {rider.riderName}
              </h3>
              <Button
                ref={contactCloseRef}
                variant="ghost"
                size="icon"
                aria-label="Close contact modal"
                onClick={() => setContactModalOpen(false)}
                className="rounded-full"
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("rider.contactModalDesc")}
              </p>

              <div className="rounded-xl border bg-muted/40 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("rider.modalRiderName")}</span>
                  <span className="font-semibold text-foreground">{rider.riderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("rider.modalVehicle")}</span>
                  <span className="text-foreground">{rider.vehicleModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("rider.modalMaskedNumber")}</span>
                  <span className="font-mono font-semibold text-primary">{rider.phoneMasked}</span>
                </div>
              </div>

              <div className="rounded-lg bg-secondary/30 border border-secondary/60 p-3 text-[11px] text-secondary-foreground">
                <p className="font-medium">
                  Demonstration mode: No telephone call will be initiated.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setContactModalOpen(false)}>{t("common.close")}</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
