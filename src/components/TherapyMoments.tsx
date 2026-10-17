import { Leaf, MessageCircleHeart, Users, HandHeart } from "lucide-react";
import garden from "@/assets/calm-garden.jpg";
import quiet from "@/assets/quiet-moment.jpg";

const points = [
  { icon: MessageCircleHeart, title: "You don’t need the perfect words", text: "Start with what’s on your mind. Feeling unsure, quiet or emotional in a first session is okay." },
  { icon: HandHeart, title: "Your pace. Your comfort.", text: "You can ask questions, pause, or say you’re not ready to discuss something yet." },
  { icon: Users, title: "The right fit matters", text: "Ask about their approach and experience with your concern. It’s okay to explore another consultant." },
  { icon: Leaf, title: "Small steps count", text: "Therapy can help you notice patterns and build coping skills. Progress looks different for everyone." },
];

export function TherapyMoments() {
  return <>
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm font-semibold text-primary">A LITTLE REASSURANCE</p>
      <h2 className="mt-3 text-3xl md:text-4xl">There’s no “right way” to begin.</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{points.map(point => <div key={point.title}><point.icon className="size-7 text-primary" /><h3 className="mt-4 text-xl">{point.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point.text}</p></div>)}</div>
      <details className="mt-9 border-y py-5"><summary className="cursor-pointer font-semibold">What can I expect in my first session?</summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">Your consultant may ask what brought you in, how daily life has been, and what you hope will change. You can discuss confidentiality, session fees and their approach before deciding on a care plan together. There is no need to prepare a perfect story.</p></details>
    </section>
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold text-primary">SLOW DOWN FOR A MOMENT</p>
        <h2 className="mt-3 text-3xl md:text-4xl">A little room to breathe.</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">Let your shoulders soften. Rest your eyes on something gentle. You’re allowed to take a pause.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <figure><img src={garden} alt="A sunlit garden path beside a still pond and lavender flowers" width={1536} height={1024} loading="lazy" className="aspect-[3/2] w-full rounded-lg object-cover" /><figcaption className="mt-4"><h3 className="text-xl">Find a quiet corner</h3><p className="mt-2 text-sm text-muted-foreground">Notice three colours, two textures and one sound around you.</p></figcaption></figure>
          <figure><img src={quiet} alt="A woman taking a peaceful moment beside a sunlit window and plants" width={1536} height={1024} loading="lazy" className="aspect-[3/2] w-full rounded-lg object-cover" /><figcaption className="mt-4"><h3 className="text-xl">Come back to this moment</h3><p className="mt-2 text-sm text-muted-foreground">Feel your feet on the floor. Breathe gently, without forcing it.</p></figcaption></figure>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Illustrative AI-created images · These gentle pauses are not a replacement for professional support.</p>
      </div>
    </section>
  </>;
}