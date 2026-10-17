import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Policy — TherapEase" },
      { name: "description", content: "How TherapEase protects your personal and health information." },
      { property: "og:title", content: "Privacy & Policy — TherapEase" },
      { property: "og:description", content: "How TherapEase protects your personal and health information." },
    ],
  }),
  component: Privacy,
});

const items = [
  ["Confidentiality", "Everything you share with a consultant stays between you and them. We never sell personal data."],
  ["Data we collect", "Name, contact details, booking details and the concern you describe — only to arrange your session."],
  ["Verification", "Every consultant's RCI licence and identity is checked before listing."],
  ["Payments & refunds", "Payments are held securely and refunded in full if a consultant cancels or rejects a request."],
  ["Safety", "Our chat detects crisis language and immediately shows national helplines like Tele-MANAS 14416."],
  ["Your rights", "Request a copy or deletion of your data anytime at care@therapease.in, in line with India's DPDP Act, 2023."],
];

function Privacy() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="text-sm text-primary">← Home</Link>
        <h1 className="mt-4 text-4xl">Privacy & Policy</h1>
        <div className="mt-8 space-y-6">
          {items.map(([t, d]) => (
            <div key={t}><h2 className="text-xl">{t}</h2><p className="mt-1 text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
