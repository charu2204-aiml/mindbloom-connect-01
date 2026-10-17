import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TherapEase — Trusted in-person therapy in India" },
      { name: "description", content: "Why TherapEase exists: one trusted place to find licensed therapists across India." },
      { property: "og:title", content: "About TherapEase" },
      { property: "og:description", content: "One trusted place to find licensed therapists across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="text-sm text-primary">← Home</Link>
        <h1 className="mt-4 text-4xl">About TherapEase</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
          <p>India has apps for doctors, fitness, diet and yoga — but no single trusted place to find a real, licensed therapist for an in-person session. Searching social media or AI tools gives endless names and little trust.</p>
          <p>Just as food-delivery apps earned trust by bringing every restaurant into one place, TherapEase brings verified clinical psychologists together — with intro videos, licence proof, location and honest pricing from ₹800 to ₹25,000 packages.</p>
          <p>We also arrange travel and meals as complete care packages, and our subscription keeps you on track with follow-up reminders, aftercare guidance and doubt-clearing sessions.</p>
          <p className="font-semibold text-foreground">Verified. Affordable. Confidential. Made in India, for India.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
