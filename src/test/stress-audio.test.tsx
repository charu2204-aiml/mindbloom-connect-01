import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BubblePop, Breathing } from "@/components/StressGame";
import {
  playBubblePop,
  playBreathingChime,
  closeAudioContext,
  resetAudioRateLimits,
} from "@/lib/stress-audio";

class MockGainNode {
  gain = {
    value: 1,
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  };
  connect = vi.fn();
  disconnect = vi.fn();
}

class MockOscillatorNode {
  frequency = {
    value: 440,
    setValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
  };
  type = "sine";
  connect = vi.fn();
  disconnect = vi.fn();
  start = vi.fn();
  stop = vi.fn();
  onended: (() => void) | null = null;
}

class MockAudioContext {
  state: AudioContextState = "suspended";
  currentTime = 10;
  destination = {};
  createGain = vi.fn(() => new MockGainNode());
  createOscillator = vi.fn(() => new MockOscillatorNode());
  resume = vi.fn().mockImplementation(async () => {
    this.state = "running";
  });
  close = vi.fn().mockImplementation(async () => {
    this.state = "closed";
  });
}

describe("Phase 6: Audio Synthesizer Unit Tests", () => {
  let mockCtx: MockAudioContext;

  beforeEach(() => {
    closeAudioContext();
    resetAudioRateLimits();
    mockCtx = new MockAudioContext();
  });

  afterEach(() => {
    closeAudioContext();
    vi.restoreAllMocks();
  });

  it("handles null or unsupported audio contexts gracefully without throwing", () => {
    expect(() => playBubblePop(null)).not.toThrow();
    expect(() => playBreathingChime(null, 0)).not.toThrow();
  });

  it("plays short gentle frequency sweep for bubble pop with envelope", () => {
    playBubblePop(mockCtx as unknown as AudioContext);

    expect(mockCtx.createOscillator).toHaveBeenCalledTimes(1);
    expect(mockCtx.createGain).toHaveBeenCalledTimes(1);

    const osc = mockCtx.createOscillator.mock.results[0]?.value as MockOscillatorNode;
    expect(osc.frequency.setValueAtTime).toHaveBeenCalledWith(350, 10);
    expect(osc.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(700, 10 + 0.05);
    expect(osc.start).toHaveBeenCalledWith(10);
    expect(osc.stop).toHaveBeenCalledWith(10 + 0.08);
  });

  it("rate limits bubble pop sounds during rapid successive calls", () => {
    playBubblePop(mockCtx as unknown as AudioContext);
    // Immediate second call within 50ms should be ignored by rate limiter
    playBubblePop(mockCtx as unknown as AudioContext);

    expect(mockCtx.createOscillator).toHaveBeenCalledTimes(1);
  });

  it("plays distinct chimes for inhale (0), hold (1), and exhale (2)", () => {
    // Phase 0: Inhale (chord of 2 tones)
    playBreathingChime(mockCtx as unknown as AudioContext, 0);
    expect(mockCtx.createOscillator).toHaveBeenCalledTimes(2);

    // Phase 1: Hold (1 tone)
    mockCtx.createOscillator.mockClear();
    playBreathingChime(mockCtx as unknown as AudioContext, 1);
    expect(mockCtx.createOscillator).toHaveBeenCalledTimes(1);

    // Phase 2: Exhale (1 descending tone)
    mockCtx.createOscillator.mockClear();
    playBreathingChime(mockCtx as unknown as AudioContext, 2);
    expect(mockCtx.createOscillator).toHaveBeenCalledTimes(1);
    const osc = mockCtx.createOscillator.mock.results[0]?.value as MockOscillatorNode;
    expect(osc.frequency.setValueAtTime).toHaveBeenCalledWith(392.0, 10);
    expect(osc.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(
      329.63,
      expect.any(Number),
    );
  });
});

describe("Phase 6: BubblePop Component", () => {
  let originalAudioContext: typeof window.AudioContext;

  beforeEach(() => {
    closeAudioContext();
    resetAudioRateLimits();
    originalAudioContext = window.AudioContext;
    (window as unknown as { AudioContext: typeof MockAudioContext }).AudioContext =
      MockAudioContext;
  });

  afterEach(() => {
    window.AudioContext = originalAudioContext;
    closeAudioContext();
  });

  it("is silent by default with sound toggle off", () => {
    render(<BubblePop />);

    const soundBtn = screen.getByRole("button", {
      name: "Enable bubble pop sound",
    });
    expect(soundBtn).toBeInTheDocument();
    expect(soundBtn).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText(/Audio muted by default/)).toBeInTheDocument();
  });

  it("toggles sound on and off with accessible aria labels", () => {
    render(<BubblePop />);

    const soundBtn = screen.getByRole("button", {
      name: "Enable bubble pop sound",
    });
    fireEvent.click(soundBtn);

    expect(soundBtn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("Disable bubble pop sound")).toBeInTheDocument();
    expect(screen.getByText(/Soft audio enabled/)).toBeInTheDocument();

    // Toggle off
    fireEvent.click(soundBtn);
    expect(soundBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("spawns bubbles, allows popping them, increments score, and supports reset", () => {
    vi.useFakeTimers();
    try {
      render(<BubblePop />);

      // Fast forward timer to spawn bubbles
      act(() => {
        vi.advanceTimersByTime(1500);
      });

      const bubbles = screen.getAllByRole("button", { name: "Pop bubble" });
      expect(bubbles.length).toBeGreaterThan(0);

      // Pop the first bubble
      act(() => {
        fireEvent.click(bubbles[0]!);
      });
      expect(screen.getByText("Popped: 1")).toBeInTheDocument();

      // Click reset
      const resetBtn = screen.getByRole("button", { name: "Reset bubble pop score" });
      act(() => {
        fireEvent.click(resetBtn);
      });
      expect(screen.getByText("Popped: 0")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("Phase 6: Breathing Component", () => {
  let originalAudioContext: typeof window.AudioContext;

  beforeEach(() => {
    closeAudioContext();
    resetAudioRateLimits();
    originalAudioContext = window.AudioContext;
    (window as unknown as { AudioContext: typeof MockAudioContext }).AudioContext =
      MockAudioContext;
  });

  afterEach(() => {
    window.AudioContext = originalAudioContext;
    closeAudioContext();
  });

  it("is silent by default and displays all phase labels and disclaimer", () => {
    render(<Breathing />);

    const soundBtn = screen.getByRole("button", {
      name: "Enable breathing chimes",
    });
    expect(soundBtn).toBeInTheDocument();
    expect(soundBtn).toHaveAttribute("aria-pressed", "false");

    // Phase labels and steps
    expect(screen.getByText("1. Inhale (4s)")).toBeInTheDocument();
    expect(screen.getByText("2. Hold (4s)")).toBeInTheDocument();
    expect(screen.getByText("3. Exhale (4s)")).toBeInTheDocument();

    // Prominent disclaimer
    expect(
      screen.getByText(/Not a medical treatment or substitute for clinical mental healthcare\./),
    ).toBeInTheDocument();
  });

  it("transitions through 4-4-4 phases over time", () => {
    vi.useFakeTimers();
    try {
      render(<Breathing />);

      expect(screen.getByText("Breathe in…")).toBeInTheDocument();

      // Advance 4s -> Hold
      act(() => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByText("Hold…")).toBeInTheDocument();

      // Advance 4s -> Breathe out
      act(() => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByText("Breathe out…")).toBeInTheDocument();

      // Advance 4s -> Cycle back to Inhale
      act(() => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByText("Breathe in…")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("supports pause, resume, and reset controls", () => {
    vi.useFakeTimers();
    try {
      render(<Breathing />);

      const pauseBtn = screen.getByRole("button", { name: "Pause breathing exercise" });
      act(() => {
        fireEvent.click(pauseBtn);
      });

      // Verify button flipped to Resume
      expect(screen.getByRole("button", { name: "Resume breathing exercise" })).toBeInTheDocument();

      // Timer shouldn't advance phase while paused
      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(screen.getByText("Breathe in…")).toBeInTheDocument();

      // Resume
      const resumeBtn = screen.getByRole("button", { name: "Resume breathing exercise" });
      act(() => {
        fireEvent.click(resumeBtn);
      });

      act(() => {
        vi.advanceTimersByTime(4000);
      });
      expect(screen.getByText("Hold…")).toBeInTheDocument();

      // Reset to start
      const resetBtn = screen.getByRole("button", { name: "Reset breathing exercise" });
      act(() => {
        fireEvent.click(resetBtn);
      });
      expect(screen.getByText("Breathe in…")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
