import { Link } from "@tanstack/react-router";
import { useCare } from "@/context/CareContext";

export function Footer() {
  const { t } = useCare();

  return (
    <footer className="mt-20 bg-plum px-6 py-12 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl">TheraPeace</p>
          <p className="mt-2 max-w-sm text-sm opacity-80 leading-relaxed">{t("footer.tagline")}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">{t("footer.contact")}</p>
          <a href="mailto:care@therapeace.in" className="block opacity-80 hover:underline">
            care@therapeace.in
          </a>
          <a href="tel:+914400001234" className="block opacity-80 hover:underline">
            +91 44 0000 1234
          </a>
          <p className="opacity-80">{t("footer.crisis")}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">{t("footer.company")}</p>
          <Link to="/about" className="block opacity-80 hover:underline">
            {t("footer.about")}
          </Link>
          <Link to="/privacy" className="block opacity-80 hover:underline">
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-primary-foreground/20 pt-6 text-xs opacity-70">
        {t("footer.proto")}
      </p>
    </footer>
  );
}
