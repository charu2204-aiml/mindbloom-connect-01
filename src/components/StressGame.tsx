import { useEffect, useState, useRef, useCallback } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAudioContext,
  resumeAudioContext,
  playBubblePop,
  playBreathingChime,
} from "@/lib/stress-audio";
import { useCare } from "@/context/CareContext";

type Bubble = { id: number; x: number; y: number; s: number };

export function BubblePop() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const { t } = useCare();

  // Generate bubbles periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setBubbles((b) =>
        b.length > 14
          ? b
          : [
              ...b,
              {
                id: Date.now() + Math.random(),
                x: Math.random() * 85,
                y: Math.random() * 80,
                s: 36 + Math.random() * 30,
              },
            ],
      );
    }, 600);
    return () => clearInterval(timer);
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        audioCtxRef.current = getAudioContext();
        resumeAudioContext(audioCtxRef.current);
      }
      return next;
    });
  }, []);

  const handlePop = (id: number) => {
    setBubbles((x) => x.filter((y) => y.id !== id));
    setScore((s) => s + 1);
    if (soundEnabled) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = getAudioContext();
      }
      playBubblePop(audioCtxRef.current);
    }
  };

  const handleReset = () => {
    setScore(0);
    setBubbles([]);
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-soft">
      <div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <h3 className="text-xl font-semibold">{t("relax.bubbleTitle")}</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              Popped: {score}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={soundEnabled ? "Disable bubble pop sound" : "Enable bubble pop sound"}
              aria-pressed={soundEnabled}
              onClick={handleToggleSound}
              title={soundEnabled ? "Sound on (click to mute)" : "Sound off (click to enable)"}
              className={`size-8 rounded-full transition-colors ${
                soundEnabled
                  ? "text-primary bg-primary/15 hover:bg-primary/25"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Reset bubble pop score"
              onClick={handleReset}
              title="Reset bubbles & score"
              className="size-8 rounded-full text-muted-foreground hover:bg-muted"
            >
              <RotateCcw className="size-3.5" />
            </Button>
          </div>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          Gentle sensory tapping · {soundEnabled ? "Soft audio enabled" : "Audio muted by default"}
        </p>

        <div
          role="region"
          aria-label="Bubble popping canvas"
          className="relative mt-4 h-64 overflow-hidden rounded-xl bg-soft border border-border/40 select-none"
        >
          {bubbles.map((b) => (
            <button
              key={b.id}
              type="button"
              aria-label="Pop bubble"
              onClick={() => handlePop(b.id)}
              className="absolute animate-in zoom-in rounded-full border-2 border-card bg-card/60 backdrop-blur-xs transition hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
              style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.s, height: b.s }}
            />
          ))}
          {bubbles.length === 0 && (
            <div className="grid h-full place-items-center text-xs text-muted-foreground">
              Spawning calm bubbles…
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
        {t("relax.bubbleTip")}
      </p>
    </div>
  );
}

export function Breathing() {
  const [phase, setPhase] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  const { t } = useCare();

  const phaseLabels = ["Breathe in…", "Hold…", "Breathe out…"];
  const phaseInstructions = [
    "Inhale slowly and gently through your nose",
    "Gently pause and hold your breath",
    "Release your breath slowly through your mouth",
  ];

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener?.("change", handler);
    return () => mediaQuery.removeEventListener?.("change", handler);
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        audioCtxRef.current = getAudioContext();
        resumeAudioContext(audioCtxRef.current);
      }
      return next;
    });
  }, []);

  // 4-4-4 phase timer (4 seconds per phase)
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setPhase((prevPhase) => {
        const nextPhase = (prevPhase + 1) % 3;
        if (soundEnabledRef.current) {
          if (!audioCtxRef.current) {
            audioCtxRef.current = getAudioContext();
          }
          playBreathingChime(audioCtxRef.current, nextPhase);
        }
        return nextPhase;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isActive]);

  const handleReset = () => {
    setPhase(0);
    setIsActive(true);
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-soft">
      <div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Wind className="size-5 text-primary" />
            <h3 className="text-xl font-semibold">4-4-4 Box Breathing</h3>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={soundEnabled ? "Disable breathing chimes" : "Enable breathing chimes"}
              aria-pressed={soundEnabled}
              onClick={handleToggleSound}
              title={soundEnabled ? "Chime on (click to mute)" : "Chime off (click to enable)"}
              className={`size-8 rounded-full transition-colors ${
                soundEnabled
                  ? "text-primary bg-primary/15 hover:bg-primary/25"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={isActive ? "Pause breathing exercise" : "Resume breathing exercise"}
              onClick={() => setIsActive((prev) => !prev)}
              title={isActive ? "Pause" : "Resume"}
              className="size-8 rounded-full text-muted-foreground hover:bg-muted"
            >
              {isActive ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Reset breathing exercise"
              onClick={handleReset}
              title="Reset"
              className="size-8 rounded-full text-muted-foreground hover:bg-muted"
            >
              <RotateCcw className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
          <span className="rounded bg-muted px-2 py-0.5">1. Inhale (4s)</span>
          <span className="rounded bg-muted px-2 py-0.5">2. Hold (4s)</span>
          <span className="rounded bg-muted px-2 py-0.5">3. Exhale (4s)</span>
        </div>

        {/* Breathing Circle Area */}
        <div
          role="region"
          aria-label="Breathing guide"
          className="relative mt-4 flex h-64 flex-col items-center justify-center rounded-xl bg-soft border border-border/40 p-4 text-center select-none overflow-hidden"
        >
          {/* Animated concentric breathing halo */}
          <div
            className={`grid place-items-center rounded-full bg-card/90 shadow-soft border-2 border-primary/40 transition-all duration-1000 ease-in-out ${
              reducedMotion
                ? "size-40"
                : phase === 0
                  ? "size-44 scale-105 border-primary"
                  : phase === 1
                    ? "size-44 scale-100 border-primary/70"
                    : "size-32 scale-90 border-primary/30"
            }`}
          >
            <div>
              <p
                role="status"
                aria-live="polite"
                className="font-display text-xl font-bold text-primary transition-all duration-300"
              >
                {phaseLabels[phase]}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">4 seconds</p>
            </div>
          </div>

          <p className="mt-4 max-w-xs text-xs text-muted-foreground leading-relaxed">
            {phaseInstructions[phase]}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-border/60 pt-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium">
            {soundEnabled ? "Audio chime enabled" : "Muted (visual only)"}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsActive((prev) => !prev)}
            className="text-xs h-7 px-3"
          >
            {isActive ? "Pause" : "Resume"}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground italic">
          Not a medical treatment or substitute for clinical mental healthcare.
        </p>
      </div>
    </div>
  );
}
