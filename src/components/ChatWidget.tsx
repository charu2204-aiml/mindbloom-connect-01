import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const HARMFUL = ["suicide", "kill myself", "end my life", "self harm", "self-harm", "want to die", "hurt myself", "sethu poren", "saaga poren", "marna", "maranam"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: "Hi, I'm Ease 🌸 How are you feeling today?" }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [crisis, setCrisis] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    if (HARMFUL.some((w) => text.toLowerCase().includes(w))) setCrisis(true);
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: acc }]);
      }
    } catch (e) {
      setMsgs([...next, { role: "assistant", content: (e as Error).message || "Something went wrong." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} aria-label="Open chat" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-strong text-2xl text-primary-foreground shadow-soft">
        {open ? "×" : "💬"}
      </button>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border bg-card shadow-soft">
          <div className="bg-strong px-4 py-3 text-primary-foreground">
            <p className="font-display text-lg">Ease · TherapEase assistant</p>
            <p className="text-xs opacity-90">Not a substitute for professional care</p>
          </div>
          {crisis && (
            <div className="border-b bg-secondary p-3 text-sm text-secondary-foreground">
              You matter. Please talk to someone now — free & 24/7:
              <div className="mt-2 flex gap-2">
                <a href="tel:14416" className="btn-primary !px-3 !py-1.5">Call Tele-MANAS 14416</a>
                <a href="tel:112" className="btn-ghost !px-3 !py-1.5">112</a>
              </div>
            </div>
          )}
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "ml-auto max-w-[80%] rounded-2xl bg-primary px-3 py-2 text-primary-foreground" : "max-w-[90%] whitespace-pre-wrap text-foreground"}>
                {m.content || <span className="animate-pulse text-muted-foreground">typing…</span>}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 border-t p-3">
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type how you feel…" className="input-field" />
            <button disabled={busy} className="btn-primary !px-4">➤</button>
          </form>
        </div>
      )}
    </>
  );
}
