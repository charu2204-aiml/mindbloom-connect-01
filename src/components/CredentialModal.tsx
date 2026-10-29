import { useEffect, useRef } from "react";
import { X, ShieldAlert, Award, GraduationCap, Building2, CheckCircle2 } from "lucide-react";
import { type Consultant } from "@/data/consultants";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export function CredentialModal({
  consultant,
  onClose,
  onBook,
}: {
  consultant: Consultant;
  onClose: () => void;
  onBook: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { t } = useCare();

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-plum/50 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="credential-title"
        className="my-8 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card p-6 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <span className="text-xs font-semibold text-primary">{t("credentialModal.title")}</span>
            <h2 id="credential-title" className="text-2xl font-display font-semibold mt-0.5">
              {consultant.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {consultant.title} · {consultant.city}
            </p>
          </div>
          <Button
            ref={closeBtnRef}
            variant="ghost"
            size="icon"
            aria-label="Close credentials modal"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Status Banner */}
        <div className="mt-5 rounded-xl border border-secondary/60 bg-secondary/30 p-3.5 flex items-start gap-3">
          <ShieldAlert className="size-5 text-secondary-foreground shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-secondary-foreground">
            <p className="font-semibold">{t("credentialModal.sampleAlertTitle")}</p>
            <p className="mt-0.5 opacity-90">{t("credentialModal.sampleAlertBody")}</p>
          </div>
        </div>

        {/* Qualifications & Registration Data */}
        <div className="mt-5 space-y-3.5 text-sm">
          <div className="flex items-start gap-3 rounded-lg border bg-muted/20 p-3">
            <GraduationCap className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">
                {t("credentialModal.educationTitle")}
              </p>
              <p className="font-medium text-foreground">
                {consultant.qualification ?? t("credentialModal.educationDefault")}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("credentialModal.educationExperience", { years: consultant.experience })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border bg-muted/20 p-3">
            <Building2 className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">
                {t("credentialModal.authorityTitle")}
              </p>
              <p className="font-medium text-foreground">
                {consultant.registrationAuthority ?? t("credentialModal.authorityDefault")}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("credentialModal.authorityDesc")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border bg-muted/20 p-3">
            <Award className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-muted-foreground">
                {t("credentialModal.regIdTitle")}
              </p>
              <p className="font-mono font-bold text-primary">{consultant.license}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("credentialModal.verifiedStatus")}
              </p>
            </div>
          </div>
        </div>

        {/* Prototype Certificate Mockup */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            {t("credentialModal.certTitle")}
          </p>
          <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-card via-muted/30 to-card p-5 text-center">
            {/* Prominent Watermark / Banner */}
            <div className="mb-3 inline-block rounded-full bg-destructive/10 px-3 py-1 text-[11px] font-bold text-destructive tracking-wide uppercase">
              {t("credentialModal.certDisclaimer")}
            </div>

            <div className="border border-border/80 rounded-lg p-4 bg-card/80">
              <Award className="size-8 mx-auto text-primary/70 mb-2" />
              <p className="font-display text-sm font-semibold tracking-wider uppercase text-foreground">
                Rehabilitation Council of India
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Central Rehabilitation Register (Demo Replica)
              </p>

              <div className="my-3 border-t border-b border-border/60 py-2">
                <p className="text-xs text-muted-foreground">This certifies that</p>
                <p className="font-display font-bold text-base text-primary mt-0.5">
                  {consultant.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  is registered under Registration No:{" "}
                  <span className="font-mono font-bold">{consultant.license}</span>
                </p>
              </div>

              <p className="text-[10px] text-muted-foreground italic">
                {t("credentialModal.certNotice")}
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="mt-6 rounded-lg bg-muted/60 p-3.5 text-xs text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-primary" />
            <span>TheraPeace Verification Policy</span>
          </p>
          <p className="mt-1">
            This prototype does not independently verify professional credentials or clinical
            licenses. In the production release, every clinical psychologist must submit official
            RCI certificates, degree transcripts, and identity proof subject to multi-tier manual
            background checks before profile publication.
          </p>
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
