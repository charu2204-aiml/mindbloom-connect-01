// Gentle Web Audio API synthesizer for relaxation activities
// No external audio files or tracking. Generates gentle, private, synthesized tones.

let globalAudioCtx: AudioContext | null = null;
let lastPopTimestamp = 0;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;

  if (!globalAudioCtx || globalAudioCtx.state === "closed") {
    try {
      globalAudioCtx = new AudioCtx();
    } catch {
      return null;
    }
  }
  return globalAudioCtx;
}

export function resumeAudioContext(ctx: AudioContext | null): void {
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
}

/**
 * Short, gentle bubble pop sound: soft sine frequency sweep (350Hz -> 700Hz)
 * Throttled to prevent harsh overlapping audio during rapid clicks.
 */
export function playBubblePop(ctx: AudioContext | null): void {
  if (!ctx) return;
  const now = performance.now();
  // Rate-limit: at most one pop every 50ms
  if (now - lastPopTimestamp < 50) return;
  lastPopTimestamp = now;

  try {
    resumeAudioContext(ctx);
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Soft rising pitch sweep
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.exponentialRampToValueAtTime(700, t + 0.05);

    // Gentle gain envelope with soft attack and quick exponential decay
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);

    osc.onended = () => {
      try {
        osc.disconnect();
        gain.disconnect();
      } catch {
        // Ignore disconnect errors on teardown
      }
    };
  } catch {
    // Graceful silent fallback if audio fails
  }
}

/**
 * Calming chime for 4-4-4 breathing phase transitions.
 * - Phase 0 (Inhale): Warm dual-tone chord (C5 + E5)
 * - Phase 1 (Hold): Steady centering tone (G4)
 * - Phase 2 (Exhale): Descending relaxing tone (G4 -> E4)
 */
export function playBreathingChime(ctx: AudioContext | null, phase: number): void {
  if (!ctx) return;
  try {
    resumeAudioContext(ctx);
    const t = ctx.currentTime;

    if (phase === 0) {
      // Inhale: Ascending gentle chord
      playTone(ctx, 523.25, t, 0.8, 0.08); // C5
      playTone(ctx, 659.25, t + 0.04, 0.75, 0.05); // E5
    } else if (phase === 1) {
      // Hold: Grounded centering tone
      playTone(ctx, 392.0, t, 0.7, 0.07); // G4
    } else if (phase === 2) {
      // Exhale: Descending relaxing tone
      playDescendingTone(ctx, 392.0, 329.63, t, 1.0, 0.08); // G4 -> E4
    }
  } catch {
    // Graceful silent fallback
  }
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  peakGain: number,
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);

  osc.onended = () => {
    try {
      osc.disconnect();
      gain.disconnect();
    } catch {
      // Ignore disconnect errors on teardown
    }
  };
}

function playDescendingTone(
  ctx: AudioContext,
  startFreq: number,
  endFreq: number,
  startTime: number,
  duration: number,
  peakGain: number,
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(startFreq, startTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration * 0.7);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);

  osc.onended = () => {
    try {
      osc.disconnect();
      gain.disconnect();
    } catch {
      // Ignore disconnect errors on teardown
    }
  };
}

export function resetAudioRateLimits(): void {
  lastPopTimestamp = 0;
}

export function closeAudioContext(): void {
  lastPopTimestamp = 0;
  if (globalAudioCtx && globalAudioCtx.state !== "closed") {
    try {
      globalAudioCtx.close().catch(() => {});
    } catch {
      // Ignore close errors during browser teardown
    }
    globalAudioCtx = null;
  }
}
