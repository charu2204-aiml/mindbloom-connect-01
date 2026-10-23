import { Leaf, MessageCircleHeart, Users, HandHeart, Eye, Wind, Heart } from "lucide-react";
import { useSiteText } from "@/lib/site-language";

const icons = [MessageCircleHeart, HandHeart, Users, Leaf];
const tipIcons = [Eye, Wind, Heart];

export function TherapyMoments() {
  const t = useSiteText().moments;
  return <>
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm font-semibold text-primary">{t.eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-4xl">{t.title}</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{t.points.map(([title, text], i) => { const Icon = icons[i] ?? Leaf; return <div key={title}><Icon className="size-7 text-primary" /><h3 className="mt-4 text-xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></div>; })}</div>
      <details className="mt-9 border-y py-5"><summary className="cursor-pointer font-semibold">{t.faqQ}</summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t.faqA}</p></details>
    </section>
    <section className="bg-soft py-16">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold text-primary">{t.breatheEyebrow}</p>
        <h2 className="mt-3 text-3xl md:text-4xl">{t.breatheTitle}</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t.breatheText}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">{t.tips.map(([title, text], i) => { const Icon = tipIcons[i] ?? Heart; return <div key={title} className="rounded-2xl bg-card p-6 shadow-soft"><Icon className="size-6 text-primary" /><h3 className="mt-4 text-xl">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>; })}</div>
        <p className="mt-6 text-xs text-muted-foreground">{t.note}</p>
      </div>
    </section>
  </>;
}
