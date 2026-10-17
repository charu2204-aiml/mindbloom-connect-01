import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import hero from "@/assets/hero.jpg";
import { consultants, cities, travelPackages, foodPackages, type Consultant } from "@/data/consultants";
import { BubblePop, Breathing } from "@/components/StressGame";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TherapEase — Find trusted in-person therapists in India" },
      { name: "description", content: "Verified clinical psychologists near you with intro videos, licence proof, transparent fees, travel & food packages." },
      { property: "og:title", content: "TherapEase — Trusted in-person therapy in India" },
      { property: "og:description", content: "Verified therapists, affordable fees and complete care packages." },
    ],
  }),
  component: Index,
});

const steps = [
  ["Search", "Filter licensed psychologists by name, city and your maximum session fee."],
  ["Verify", "Watch their intro video, check licence proof, languages and clinic location."],
  ["Book", "Pick a date & time, describe your concern and submit for approval."],
  ["Travel & stay", "Add travel and veg / non-veg meal packages — one transparent total."],
  ["Follow-up", "Subscription keeps your next session, aftercare and doubt-clearing calls on track."],
];

const trust = [
  ["100% RCI-verified", "Every licence is checked before listing"],
  ["Confidential", "Private, secure and judgement-free"],
  ["Transparent pricing", "₹800 to premium packages — no hidden fees"],
  ["24/7 safety net", "Crisis words connect you to Tele-MANAS 14416"],
];

function Index() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [maxFee, setMaxFee] = useState(4000);
  const [booking, setBooking] = useState<Consultant | null>(null);
  const [travel, setTravel] = useState(0);
  const [food, setFood] = useState(0);
  const [days, setDays] = useState(2);
  const [sessionFee, setSessionFee] = useState(consultants[0].fee);

  const list = useMemo(
    () =>
      consultants
        .filter((c) => (c.name + c.title + c.focus.join(" ")).toLowerCase().includes(q.toLowerCase()))
        .filter((c) => !city || c.city === city)
        .filter((c) => c.fee <= maxFee)
        .sort((a, b) => b.fee - a.fee),
    [q, city, maxFee],
  );

  const total = sessionFee + travelPackages[travel].price + foodPackages[food].perDay * days;

  return (
    <div className="overflow-x-hidden">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <span className="font-display text-2xl text-primary">TherapEase</span>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#how">How it works</a><a href="#consultants">Consultants</a><a href="#packages">Packages</a><a href="#relax">Relax</a>
          </nav>
          <a href="#consultants" className="btn-primary !px-4 !py-2">Find a therapist</a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-soft">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary">Made in India · For India</span>
            <h1 className="mt-5 text-4xl leading-tight md:text-6xl">Real therapy, with people you can <em className="text-primary">trust</em>.</h1>
            <p className="mt-5 max-w-md text-muted-foreground">TherapEase connects you with licensed clinical psychologists for in-person sessions — verified, affordable, with travel and meals arranged for you.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#consultants" className="btn-primary">Search consultants</a>
              <a href="#how" className="btn-ghost">How it works</a>
            </div>
          </div>
          <img src={hero} alt="Calm therapy session" width={1024} height={1024} className="aspect-square w-full rounded-[2rem] object-cover shadow-soft" />
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl md:text-4xl">TherapEase in essence</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          India has apps for doctors, diet, fitness and yoga — yet no trusted platform to find a real therapist for an in-person session. Social media and AI search offer endless names but little credibility. Just as food-delivery platforms earned trust by bringing every restaurant under one roof, TherapEase unites verified mental-health professionals in one place: each with an intro video, licence proof, location and fees for every budget, from ₹800 sessions to complete ₹10,000–₹25,000 care packages.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(([t, d]) => (
            <div key={t} className="rounded-2xl border bg-card p-5"><p className="font-semibold text-primary">✓ {t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl md:text-4xl">How TherapEase works</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-5">
            {steps.map(([t, d], i) => (
              <div key={t} className="rounded-2xl bg-card p-5 shadow-soft">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-strong text-sm font-bold text-primary-foreground">{i + 1}</span>
                <p className="mt-4 font-semibold">{t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search + list */}
      <section id="consultants" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl md:text-4xl">Find your consultant</h2>
        <div className="mt-6 grid gap-3 rounded-2xl border bg-card p-4 shadow-soft md:grid-cols-3">
          <input className="input-field" placeholder="Search name or concern (e.g. anxiety)" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="input-field" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All locations</option>{cities.map((c) => <option key={c}>{c}</option>)}
          </select>
          <label className="text-sm">Max session fee: <b>₹{maxFee}</b>
            <input type="range" min={500} max={4000} step={100} value={maxFee} onChange={(e) => setMaxFee(+e.target.value)} className="w-full accent-[var(--primary)]" />
          </label>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{list.length} consultants · sorted by fee, high to low</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <article key={c.id} className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft">
              <div className="relative grid h-36 place-items-center bg-soft">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-card font-display text-xl text-primary">{c.initials}</span>
                <span className="absolute bottom-2 right-2 rounded-full bg-plum/80 px-2 py-0.5 text-xs text-primary-foreground">▶ Intro video</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.title} · {c.experience} yrs</p>
                <p className="mt-2 text-xs font-semibold text-primary">✓ Licensed · {c.license}</p>
                <p className="mt-3 text-sm">{c.bio}</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>📍 {c.city}</p><p>🗣 {c.languages.join(", ")}</p><p>🗓 In-person: {c.availability.join(", ")}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">{c.focus.map((f) => <span key={f} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{f}</span>)}</div>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <div><p className="text-xs text-muted-foreground">First consultation</p><p className="text-2xl font-bold text-primary">₹{c.fee.toLocaleString("en-IN")}</p></div>
                  <button onClick={() => setBooking(c)} className="btn-primary">View & book</button>
                </div>
              </div>
            </article>
          ))}
          {!list.length && <p className="text-muted-foreground">No consultants match. Try increasing the max fee.</p>}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl md:text-4xl">Travel & food packages</h2>
          <p className="mt-2 text-muted-foreground">Build your full care package and see an estimated total.</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="mb-3 font-semibold">Travel (by distance)</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {travelPackages.map((t, i) => (
                    <button key={t.name} onClick={() => setTravel(i)} className={`rounded-2xl border-2 bg-card p-4 text-left ${travel === i ? "border-primary" : "border-transparent"}`}>
                      <p className="font-semibold">{t.name} · ₹{t.price.toLocaleString("en-IN")}</p><p className="text-sm text-muted-foreground">{t.range} — {t.mode}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-semibold">Food (per day)</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {foodPackages.map((f, i) => (
                    <button key={f.name} onClick={() => setFood(i)} className={`rounded-2xl border-2 bg-card p-4 text-left ${food === i ? "border-primary" : "border-transparent"}`}>
                      <p className="font-semibold">{f.name}</p><p className="text-sm text-muted-foreground">{f.desc}</p><p className="mt-1 text-sm font-semibold text-primary">₹{f.perDay}/day</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-fit rounded-2xl bg-card p-6 shadow-soft">
              <p className="font-display text-xl">Estimated package</p>
              <label className="mt-4 block text-sm">Consultant
                <select className="input-field mt-1" value={sessionFee} onChange={(e) => setSessionFee(+e.target.value)}>
                  {consultants.map((c) => <option key={c.id} value={c.fee}>{c.name} — ₹{c.fee}</option>)}
                </select>
              </label>
              <label className="mt-3 block text-sm">Days of stay
                <input type="number" min={1} max={14} className="input-field mt-1" value={days} onChange={(e) => setDays(Math.max(1, +e.target.value))} />
              </label>
              <div className="mt-4 space-y-1 text-sm">
                <p className="flex justify-between"><span>Session</span><span>₹{sessionFee.toLocaleString("en-IN")}</span></p>
                <p className="flex justify-between"><span>Travel</span><span>₹{travelPackages[travel].price.toLocaleString("en-IN")}</span></p>
                <p className="flex justify-between"><span>Food × {days}</span><span>₹{(foodPackages[food].perDay * days).toLocaleString("en-IN")}</span></p>
              </div>
              <p className="mt-4 flex justify-between border-t pt-4 text-lg font-bold"><span>Total</span><span className="text-primary">₹{total.toLocaleString("en-IN")}</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2rem] bg-strong p-8 text-primary-foreground md:p-12">
          <h2 className="text-3xl md:text-4xl">TherapEase Care+ subscription</h2>
          <p className="mt-3 max-w-2xl opacity-90">Never lose track of your healing: next-session reminders, personalised aftercare & intake guidance, and on-demand doubt-clearing sessions with your consultant.</p>
          <p className="mt-6 text-3xl font-bold">₹299<span className="text-base font-normal">/month</span></p>
        </div>
      </section>

      {/* Relax */}
      <section id="relax" className="mx-auto max-w-6xl px-5 pb-8">
        <h2 className="text-3xl md:text-4xl">Take a breather</h2>
        <p className="mt-2 text-muted-foreground">Quick stress-busters while you wait.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2"><BubblePop /><Breathing /></div>
      </section>

      <Footer />
      {booking && <BookingModal c={booking} onClose={() => setBooking(null)} />}
    </div>
  );
}

function BookingModal({ c, onClose }: { c: Consultant; onClose: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-plum/50 p-4" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-card p-6 shadow-soft" onClick={(e) => e.stopPropagation()}>
        {done ? (
          <div className="py-6 text-center">
            <p className="text-4xl">🌸</p>
            <h3 className="mt-3 text-2xl">Request submitted</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.name} will review and approve your session. We'll notify you shortly.</p>
            <button onClick={onClose} className="btn-primary mt-6">Done</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-3">
            <div className="flex items-start justify-between">
              <div><h3 className="text-2xl">{c.name}</h3><p className="text-sm text-muted-foreground">{c.title} · 📍 {c.city}</p></div>
              <button type="button" onClick={onClose} className="text-2xl text-muted-foreground">×</button>
            </div>
            <p className="rounded-xl bg-muted p-3 text-sm">{c.bio} <b className="text-primary">First session ₹{c.fee}</b></p>
            <input required className="input-field" placeholder="Your name" />
            <div className="grid grid-cols-2 gap-3">
              <input required type="date" className="input-field" />
              <input required type="time" className="input-field" />
            </div>
            <textarea required rows={4} className="input-field" placeholder="Briefly describe what you'd like help with" />
            <button className="btn-primary w-full">Submit for approval</button>
          </form>
        )}
      </div>
    </div>
  );
}
