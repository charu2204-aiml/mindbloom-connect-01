import { createFileRoute } from "@tanstack/react-router";

const SYSTEM = `You are "Ease", the friendly assistant of TherapEase, an Indian platform that connects people with licensed clinical psychologists for in-person therapy, with travel and food packages. Be warm, brief and supportive. You are not a therapist and never diagnose. If someone mentions self-harm or crisis, urge them to call Tele-MANAS 14416 or 112 immediately.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        console.log("[chat] start");
        const { messages } = (await request.json()) as { messages: { role: string; content: string }[] };
        console.log("[chat] parsed");
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("AI is not configured.", { status: 500 });
        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "fetch" },
          body: JSON.stringify({
            model: "openai/gpt-6-astra",
            instructions: SYSTEM,
            input: messages.slice(-20).map((m) => ({ role: m.role, content: m.content })),
            reasoning: { effort: "low" },
            store: false,
            stream: true,
          }),
        });
        if (!upstream.ok || !upstream.body) {
          const msg = upstream.status === 429 ? "Too many requests, please wait a moment." : upstream.status === 402 ? "AI credits are used up for now." : "The assistant is unavailable right now.";
          return new Response(msg, { status: upstream.status });
        }
        const dec = new TextDecoder();
        const enc = new TextEncoder();
        let buf = "";
        const stream = upstream.body.pipeThrough(
          new TransformStream<Uint8Array, Uint8Array>({
            transform(chunk, controller) {
              buf += dec.decode(chunk, { stream: true });
              const lines = buf.split("\n");
              buf = lines.pop() ?? "";
              for (const line of lines) {
                if (!line.startsWith("data:")) continue;
                try {
                  const ev = JSON.parse(line.slice(5).trim());
                  if (ev.type === "response.output_text.delta") controller.enqueue(enc.encode(ev.delta));
                } catch {}
              }
            },
          }),
        );
        return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
