import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { useCare } from "@/context/CareContext";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Policy — TheraPeace" },
      {
        name: "description",
        content: "How TheraPeace protects your personal and health information.",
      },
      { property: "og:title", content: "Privacy & Policy — TheraPeace" },
      {
        property: "og:description",
        content: "How TheraPeace protects your personal and health information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const { t, translations } = useCare();

  const items = translations.privacy?.items || [
    {
      title: "Confidentiality",
      desc: "Everything you share with a consultant stays between you and them. We never sell personal data.",
    },
    {
      title: "Data we collect",
      desc: "Name, contact details, booking details and the concern you describe — only to arrange your session.",
    },
    {
      title: "Verification",
      desc: "Every consultant's RCI licence and identity is checked before listing.",
    },
    {
      title: "Payments & refunds",
      desc: "Payments are held securely and refunded in full if a consultant cancels or rejects a request.",
    },
    {
      title: "Safety",
      desc: "Our chat detects crisis language and immediately shows national helplines like Tele-MANAS 14416.",
    },
    {
      title: "Your rights",
      desc: "Request a copy or deletion of your data anytime at care@therapeace.in, in line with India's DPDP Act, 2023.",
    },
  ];

  return (
    <div className="pb-24 md:pb-0">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="text-sm text-primary hover:underline">
          {t("privacy.backHome")}
        </Link>
        <h1 className="mt-4 text-4xl font-display font-semibold">{t("privacy.title")}</h1>
        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <div key={item.title}>
              <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
