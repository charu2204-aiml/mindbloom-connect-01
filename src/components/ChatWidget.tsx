import { useEffect, useRef, useState } from "react";
import { useCare } from "@/context/CareContext";

type Msg = { role: "user" | "assistant"; content: string };

const HARMFUL = [
  "suicide",
  "kill myself",
  "end my life",
  "self harm",
  "self-harm",
  "want to die",
  "hurt myself",
  "sethu poren",
  "saaga poren",
  "marna",
  "maranam",
  "maran",
  "chavu",
  "chaavu",
  "athma hathya",
  "atmahathya",
];

export function ChatWidget() {
  const { t, translations, language } = useCare();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [crisis, setCrisis] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or update initial greeting if user hasn't started chatting yet
  useEffect(() => {
    setMsgs((prev) => {
      if (prev.length <= 1) {
        return [{ role: "assistant", content: t("chat.welcome") }];
      }
      return prev;
    });
  }, [language, t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, busy]);

  async function handleSendText(textToSend?: string) {
    const text = (textToSend ?? input).trim();
    if (!text || busy) return;

    if (HARMFUL.some((w) => text.toLowerCase().includes(w))) {
      setCrisis(true);
    }

    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, language }),
      });

      if (!res.ok || !res.body) {
        throw new Error(await res.text());
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: acc }]);
      }
    } catch {
      // Natural localized offline fallback
      setMsgs([...next, { role: "assistant", content: t("chat.offlineFallback") }]);
    } finally {
      setBusy(false);
    }
  }

  const suggestions = translations.chat?.suggestions || [
    "I feel overwhelmed today",
    "How does in-person booking work?",
    "Help me with a breathing exercise",
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-strong text-2xl text-primary-foreground shadow-soft transition-transform hover:scale-105"
      >
        {open ? "×" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-36 right-4 md:bottom-24 md:right-6 z-50 flex h-[65vh] max-h-[540px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border bg-card shadow-soft">
          <div className="bg-strong px-4 py-3 text-primary-foreground">
            <p className="font-display text-lg">{t("chat.title")}</p>
            <p className="text-xs opacity-90">{t("chat.subtitle")}</p>
          </div>

          {crisis && (
            <div className="border-b bg-secondary p-3 text-xs text-secondary-foreground space-y-2">
              <p className="font-medium">{t("chat.crisisTitle")}</p>
              <div className="flex flex-wrap gap-2">
                <a href="tel:14416" className="btn-primary !px-3 !py-1 text-xs">
                  {t("chat.callTeleManas")}
                </a>
                <a href="tel:112" className="btn-ghost !px-3 !py-1 text-xs">
                  {t("chat.call112")}
                </a>
              </div>
            </div>
          )}

          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[80%] rounded-2xl bg-primary px-3 py-2 text-primary-foreground text-xs md:text-sm"
                    : "max-w-[90%] whitespace-pre-wrap text-foreground text-xs md:text-sm"
                }
              >
                {m.content || (
                  <span className="animate-pulse text-muted-foreground">{t("chat.typing")}</span>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Suggestions */}
          {msgs.length <= 2 && (
            <div className="border-t bg-muted/30 px-3 py-2 flex flex-wrap gap-1.5">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendText(s)}
                  className="rounded-full bg-card border px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendText();
            }}
            className="flex gap-2 border-t p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              className="input-field text-xs md:text-sm"
            />
            <button disabled={busy} aria-label={t("chat.send")} className="btn-primary !px-4">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
