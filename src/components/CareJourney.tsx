import { useState } from "react";
import { CalendarDays, ClipboardCheck, Heart, ArrowRight, CheckCircle2, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { completeSession, hasCompletedSession, type CareSession } from "@/lib/care-journey";

export function CareJourney({ sessions, onSessionsChange, onBook }: {
  sessions: CareSession[];
  onSessionsChange: (sessions: CareSession[]) => void;
  onBook: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("appointments");
  const [reflection, setReflection] = useState("");
  const [savedReflection, setSavedReflection] = useState("");
  const [mood, setMood] = useState("");
  const completed = hasCompletedSession(sessions);
  function show(value: string) { setTab(value); setOpen(true); }
  function book() { setOpen(false); onBook(); }

  return <>
    <aside aria-label="Your care shortcuts" className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2 rounded-lg border bg-card p-1.5 shadow-soft">
      <Button variant="ghost" size="icon" title="Next appointments" aria-label="Next appointments" onClick={() => show("appointments")}><CalendarDays /></Button>
      <Button variant="ghost" size="icon" title="Session updates" aria-label="Session updates" onClick={() => show("updates")}><ClipboardCheck /></Button>
      <Button variant="ghost" size="icon" title="My check-in" aria-label="My check-in" onClick={() => show("checkin")}><Heart /></Button>
    </aside>
    <section id="care" className="border-y bg-muted py-16">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold text-primary">AFTER YOUR FIRST VISIT</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Your care doesn’t end at the clinic.</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">Make room for small wins, reflect on your session, and keep your next conversation in sight. Healing doesn’t have to be a straight line.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[{ icon: ClipboardCheck, title: "After-session updates", text: "A space for your reflections, questions and the things you want to revisit.", tab: "updates" }, { icon: CalendarDays, title: "Your next meeting", text: "Review requested dates and return to the same consultant for your follow-up.", tab: "appointments" }, { icon: Heart, title: "A moment for you", text: "Notice how you feel between sessions, without pressure to feel a certain way.", tab: "checkin" }].map(item => <div key={item.tab} className="border-t border-primary/30 pt-5">
            <item.icon className="size-6 text-primary" /><h3 className="mt-4 text-xl">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            <Button variant="link" className="mt-3 px-0" onClick={() => show(item.tab)}>Open {item.tab === "appointments" ? "appointments" : item.tab === "updates" ? "updates" : "check-in"}<ArrowRight /></Button>
          </div>)}
        </div>
      </div>
    </section>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full overflow-y-auto pb-24 sm:max-w-lg">
        <SheetHeader className="text-left"><SheetTitle className="text-2xl">My care journey</SheetTitle><SheetDescription>Prototype · Entries stay only while this page is open. Requests are not sent to a clinic.</SheetDescription></SheetHeader>
        <Tabs value={tab} onValueChange={setTab} className="mt-7">
          <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="appointments">Dates</TabsTrigger><TabsTrigger value="updates">Updates</TabsTrigger><TabsTrigger value="checkin">Check-in</TabsTrigger></TabsList>
          <TabsContent value="appointments" className="mt-6 space-y-4">
            <h3 className="text-xl">Your appointments</h3>
            {!sessions.length && <p className="py-6 text-sm text-muted-foreground">No visits yet. Choose a consultant to request your first in-person session.</p>}
            {sessions.map(session => <article key={session.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-start justify-between gap-2"><p className="font-semibold">{session.consultant}</p><span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">{session.status}</span></div>
              <p className="mt-3 flex items-center gap-2 text-sm"><CalendarDays className="size-4 text-primary" />{new Date(`${session.date}T${session.time}`).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
              {session.status === "Requested" && <Button variant="outline" className="mt-4 w-full" onClick={() => onSessionsChange(completeSession(sessions, session.id))}><CheckCircle2 />Mark attended (demo)</Button>}
            </article>)}
            <Button onClick={book} className="w-full"><CalendarPlus />{completed ? "Request a follow-up" : "Find a consultant"}</Button>
            <p className="text-xs text-muted-foreground">Dates are requested, not confirmed. A real appointment needs clinic approval.</p>
          </TabsContent>
          <TabsContent value="updates" className="mt-6 space-y-4">
            <h3 className="text-xl">After your session</h3>
            {!completed ? <><p className="text-sm text-muted-foreground">Your after-session space opens once your first visit is marked attended.</p><Button variant="outline" onClick={() => setTab("appointments")}>View appointments<ArrowRight /></Button></> : <>
              <p className="flex items-center gap-2 text-sm text-primary"><CheckCircle2 className="size-4" />Your first step is worth recognising.</p>
              <label className="block text-sm font-semibold" htmlFor="session-reflection">What would you like to remember or discuss next?</label>
              <textarea id="session-reflection" value={reflection} onChange={e => setReflection(e.target.value)} rows={5} className="input-field" placeholder="A small win, a question, or a feeling…" />
              <Button disabled={!reflection.trim()} onClick={() => setSavedReflection(reflection.trim())}><ClipboardCheck />Save reflection for this visit</Button>
              {savedReflection && <div role="status" className="border-l-2 border-primary pl-4"><p className="text-sm font-semibold">Your reflection</p><p className="mt-2 whitespace-pre-wrap break-words text-sm text-muted-foreground">{savedReflection}</p></div>}
              <div className="border-t pt-4"><h3 className="text-lg">Before your next meeting</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground"><li>Bring questions you didn’t get to ask.</li><li>Notice what felt helpful or uncomfortable.</li><li>Follow only the care plan your consultant gives you.</li></ul></div>
              <Button variant="outline" className="w-full" onClick={book}><CalendarPlus />Meet my consultant again</Button>
            </>}
          </TabsContent>
          <TabsContent value="checkin" className="mt-6 space-y-5">
            <h3 className="text-xl">How are you feeling right now?</h3><p className="text-sm text-muted-foreground">Every feeling is welcome here.</p>
            <div className="grid grid-cols-2 gap-2">{["Overwhelmed", "Low", "Okay", "Hopeful"].map(value => <Button key={value} variant={mood === value ? "default" : "outline"} aria-pressed={mood === value} onClick={() => setMood(value)}>{value}</Button>)}</div>
            {mood && <p role="status" className="rounded-lg bg-muted p-4 text-sm">You’re feeling {mood.toLowerCase()}. Thank you for taking a moment to notice. You don’t need to solve everything today.</p>}
            <p className="border-t pt-5 text-sm text-muted-foreground">If you feel unsafe or need urgent support, call <a href="tel:14416" className="font-semibold text-primary">Tele-MANAS 14416</a>. In an emergency, call <a href="tel:112" className="font-semibold text-primary">112</a>.</p>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  </>;
}