import { useState } from "react";
import { Play, ExternalLink, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteText } from "@/lib/site-language";

const clips = [
  {
    id: "7LD8iC4NqXM",
    title: "A first CBT session",
    subtitle: "An educational case example about low mood",
    source: "Clinical case demonstration",
  },
  {
    id: "8-2WQF3SWwo",
    title: "Understanding thought patterns",
    subtitle: "Dr. Judy explores core beliefs in a mock session",
    source: "MedCircle",
  },
  {
    id: "x7HJmVx3qN4",
    title: "A CBT conversation",
    subtitle: "A role-play showing a collaborative therapy approach",
    source: "Educational role-play",
  },
];

export function TherapyClips() {
  const [playing, setPlaying] = useState<string[]>([]);
  const t = useSiteText().clips;

  return (
    <section id="therapy-clips" className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm font-semibold text-primary">{t.eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-4xl">{t.title}</h2>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">{t.text}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {clips.map((clip) => (
          <article key={clip.id} className="overflow-hidden rounded-lg border bg-card">
            <div className="aspect-video bg-muted">
              {playing.includes(clip.id) ? (
                <iframe
                  title={clip.title}
                  src={`https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1`}
                  className="h-full w-full border-0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3">
                  <Video className="size-8 text-primary" />
                  <Button
                    variant="secondary"
                    onClick={() => setPlaying((prev) => [...prev, clip.id])}
                  >
                    <Play className="size-4 mr-1.5" />
                    <span>{t.watch}</span>
                  </Button>
                </div>
              )}
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-primary">{clip.source}</p>
              <h3 className="mt-2 text-xl font-semibold">{clip.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{clip.subtitle}</p>
              <Button variant="link" asChild className="mt-3 px-0">
                <a
                  href={`https://www.youtube.com/watch?v=${clip.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  <span>{t.open}</span>
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">{t.foot}</p>
    </section>
  );
}
