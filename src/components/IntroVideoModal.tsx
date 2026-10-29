import { useEffect, useRef } from "react";
import { X, Film, Clock, Sparkles } from "lucide-react";
import { type Consultant } from "@/data/consultants";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export function IntroVideoModal({
  consultant,
  onClose,
  onBook,
}: {
  consultant: Consultant;
  onClose: () => void;
  onBook: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { t, translations } = useCare();

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const points = translations.introVideoModal?.points || [
    "What to expect upon arrival at the private consulting room",
    "A gentle walk-through of the first intake conversation",
    "A clear review of confidentiality policies and fees",
  ];

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-plum/50 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        className="my-8 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-6 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <span className="text-xs font-semibold text-primary">{t("introVideoModal.title")}</span>
            <h2 id="video-modal-title" className="text-2xl font-display font-semibold mt-0.5">
              {consultant.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {consultant.title} · 📍 {consultant.city}
            </p>
          </div>
          <Button
            ref={closeBtnRef}
            variant="ghost"
            size="icon"
            aria-label="Close introduction video modal"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Video Area: Real Video Player OR Coming-Soon Placeholder */}
        <div className="mt-5">
          {consultant.videoUrl ? (
            <div className="overflow-hidden rounded-xl border bg-black shadow-inner">
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-video"
                src={consultant.videoUrl}
              >
                <track kind="captions" label="English" srcLang="en" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="rounded-xl border border-border/80 bg-gradient-to-b from-soft to-card p-8 text-center shadow-xs">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-card shadow-sm border border-primary/20 text-primary">
                <Film className="size-8" />
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                <Clock className="size-3.5" />
                <span>Introduction Video Coming Soon</span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Authentic Clinic Introduction in Preparation
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground max-w-sm mx-auto">
                {t("introVideoModal.comingSoonBody", {
                  name: consultant.name,
                  languages: consultant.languages.join(" & "),
                })}
              </p>

              <div className="mt-5 grid gap-2.5 text-left text-xs bg-card/80 rounded-lg p-3.5 border border-border/60">
                {points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Sparkles className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{pt}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
                  <span>
                    TheraPeace does not use stock footage or unrelated actor demonstrations.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            {t("common.close")}
          </Button>
          <Button
            onClick={() => {
              onClose();
              onBook();
            }}
            className="w-full sm:w-auto btn-primary"
          >
            Book Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
