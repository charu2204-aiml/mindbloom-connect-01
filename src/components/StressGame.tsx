import { useEffect, useState } from "react";

type Bubble = { id: number; x: number; y: number; s: number };

export function BubblePop() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setBubbles((b) => (b.length > 14 ? b : [...b, { id: Date.now() + Math.random(), x: Math.random() * 85, y: Math.random() * 80, s: 36 + Math.random() * 30 }]));
    }, 600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="text-xl">Bubble Pop</h3>
        <span className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">Popped: {score}</span>
      </div>
      <div className="relative mt-4 h-64 overflow-hidden rounded-xl bg-soft">
        {bubbles.map((b) => (
          <button key={b.id} aria-label="pop" onClick={() => { setBubbles((x) => x.filter((y) => y.id !== b.id)); setScore((s) => s + 1); }}
            className="absolute animate-in zoom-in rounded-full border-2 border-card bg-card/50 transition hover:scale-110"
            style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.s, height: b.s }} />
        ))}
      </div>
    </div>
  );
}

export function Breathing() {
  const [phase, setPhase] = useState(0);
  const phases = ["Breathe in…", "Hold…", "Breathe out…"];
  useEffect(() => { const t = setInterval(() => setPhase((p) => (p + 1) % 3), 4000); return () => clearInterval(t); }, []);
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <h3 className="text-xl">4-4-4 Breathing</h3>
      <div className="grid h-64 place-items-center">
        <div className="grid place-items-center rounded-full bg-strong text-primary-foreground transition-all duration-[4000ms] ease-in-out"
          style={{ width: phase === 2 ? 90 : 190, height: phase === 2 ? 90 : 190 }}>
          <span className="text-sm font-semibold">{phases[phase]}</span>
        </div>
      </div>
    </div>
  );
}
