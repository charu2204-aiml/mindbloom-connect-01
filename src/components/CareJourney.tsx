import { useState } from "react";
import {
  CalendarDays,
  ClipboardCheck,
  Heart,
  ArrowRight,
  CheckCircle2,
  CalendarPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { completeSession, hasCompletedSession, type CareSession } from "@/lib/care-journey";
import { useCare } from "@/context/CareContext";

export function CareJourney({
  sessions,
  onSessionsChange,
  onBook,
}: {
  sessions: CareSession[];
  onSessionsChange: (sessions: CareSession[]) => void;
  onBook: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("appointments");
  const [reflection, setReflection] = useState("");
  const [savedReflection, setSavedReflection] = useState("");
  const [mood, setMood] = useState("");

  const { t, translations } = useCare();
  const completed = hasCompletedSession(sessions);

  function show(value: string) {
    setTab(value);
    setOpen(true);
  }

  function book() {
    setOpen(false);
    onBook();
  }

  const moodKeys: ("Overwhelmed" | "Low" | "Okay" | "Hopeful")[] = [
    "Overwhelmed",
    "Low",
    "Okay",
    "Hopeful",
  ];

  const cardsData = translations.care?.cards || [
    {
      title: "After-session updates",
      text: "A space for your reflections, questions and the things you want to revisit.",
      btn: "Open updates",
    },
    {
      title: "Your next meeting",
      text: "Review requested dates and return to the same consultant for your follow-up.",
      btn: "Open appointments",
    },
    {
      title: "A moment for you",
      text: "Notice how you feel between sessions, without pressure to feel a certain way.",
      btn: "Open check-in",
    },
  ];

  const tabKeys = ["updates", "appointments", "checkin"];
  const cardIcons = [ClipboardCheck, CalendarDays, Heart];

  return (
    <>
      <aside
        aria-label={t("care.shortcutsTitle")}
        className="fixed right-3 top-1/2 z-40 hidden sm:flex -translate-y-1/2 flex-col gap-2 rounded-lg border bg-card p-1.5 shadow-soft"
      >
        <Button
          variant="ghost"
          size="icon"
          title={t("care.nextAppointments")}
          aria-label={t("care.nextAppointments")}
          onClick={() => show("appointments")}
        >
          <CalendarDays />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          title={t("care.sessionUpdates")}
          aria-label={t("care.sessionUpdates")}
          onClick={() => show("updates")}
        >
          <ClipboardCheck />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          title={t("care.myCheckin")}
          aria-label={t("care.myCheckin")}
          onClick={() => show("checkin")}
        >
          <Heart />
        </Button>
      </aside>

      <section id="care" className="scroll-mt-28 border-y bg-muted py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold text-primary">{t("care.badge")}</p>
          <h2 className="mt-3 text-3xl md:text-4xl">{t("care.title")}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">{t("care.sub")}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {cardsData.map((item, idx) => {
              const Icon = cardIcons[idx] ?? Heart;
              const targetTab = tabKeys[idx] ?? "appointments";
              return (
                <div key={targetTab} className="border-t border-primary/30 pt-5">
                  <Icon className="size-6 text-primary" />
                  <h3 className="mt-4 text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  <Button
                    variant="link"
                    className="mt-3 px-0 inline-flex items-center gap-1.5"
                    onClick={() => show(targetTab)}
                  >
                    <span>{item.btn}</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full overflow-y-auto pb-24 sm:max-w-lg">
          <SheetHeader className="text-left">
            <SheetTitle className="text-2xl">{t("care.sheetTitle")}</SheetTitle>
            <SheetDescription>{t("care.sheetDesc")}</SheetDescription>
          </SheetHeader>

          <Tabs value={tab} onValueChange={setTab} className="mt-7">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appointments">{t("care.tabs.appointments")}</TabsTrigger>
              <TabsTrigger value="updates">{t("care.tabs.updates")}</TabsTrigger>
              <TabsTrigger value="checkin">{t("care.tabs.checkin")}</TabsTrigger>
            </TabsList>

            {/* Dates / Appointments Tab */}
            <TabsContent value="appointments" className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">{t("care.appointmentsTitle")}</h3>
              {!sessions.length && (
                <p className="py-6 text-sm text-muted-foreground">{t("care.noVisits")}</p>
              )}
              {sessions.map((session) => (
                <article key={session.id} className="rounded-lg border bg-card p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold">{session.consultant}</p>
                    <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground font-medium">
                      {session.status}
                    </span>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4 text-primary" />
                    <span>
                      {new Date(`${session.date}T${session.time}`).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </p>

                  {(session.travelPackage ||
                    session.foodPackage ||
                    session.totalEstimatedCost !== undefined) && (
                    <div className="mt-3 rounded-lg border bg-muted/40 p-3 text-xs space-y-1.5">
                      <p className="font-semibold text-foreground">{t("care.bundledLogistics")}</p>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {session.travelPackage && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-card px-2 py-1 border text-muted-foreground font-medium">
                            🚗 {session.travelPackage}{" "}
                            {session.travelPrice !== undefined
                              ? `(₹${session.travelPrice.toLocaleString("en-IN")})`
                              : ""}
                          </span>
                        )}
                        {session.foodPackage && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-card px-2 py-1 border text-muted-foreground font-medium">
                            🥗 {session.foodPackage} {session.days ? `(${session.days}d)` : ""}{" "}
                            {session.foodPrice !== undefined
                              ? `(₹${(session.foodPrice * (session.days || 1)).toLocaleString("en-IN")})`
                              : ""}
                          </span>
                        )}
                      </div>
                      {session.totalEstimatedCost !== undefined && (
                        <p className="pt-1 text-muted-foreground flex justify-between items-center border-t border-border/50">
                          <span>Total Estimated Cost:</span>
                          <strong className="text-primary font-bold text-sm">
                            ₹{session.totalEstimatedCost.toLocaleString("en-IN")}
                          </strong>
                        </p>
                      )}
                    </div>
                  )}

                  {session.status === "Requested" && (
                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() => onSessionsChange(completeSession(sessions, session.id))}
                    >
                      <CheckCircle2 className="size-4 mr-1.5" />
                      <span>{t("care.markAttended")}</span>
                    </Button>
                  )}
                </article>
              ))}

              <Button onClick={book} className="w-full">
                <CalendarPlus className="size-4 mr-1.5" />
                <span>{completed ? t("care.requestFollowUp") : t("care.findConsultantBtn")}</span>
              </Button>
              <p className="text-xs text-muted-foreground">{t("care.datesDisclaimer")}</p>
            </TabsContent>

            {/* Updates Tab */}
            <TabsContent value="updates" className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">{t("care.afterSessionTitle")}</h3>
              {!completed ? (
                <>
                  <p className="text-sm text-muted-foreground">{t("care.afterSessionLocked")}</p>
                  <Button variant="outline" onClick={() => setTab("appointments")}>
                    <span>{t("care.viewAppointmentsBtn")}</span>
                    <ArrowRight className="size-4 ml-1.5" />
                  </Button>
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2 text-sm text-primary font-medium">
                    <CheckCircle2 className="size-4" />
                    <span>{t("care.firstStepPraise")}</span>
                  </p>
                  <label className="block text-sm font-semibold" htmlFor="session-reflection">
                    {t("care.reflectionLabel")}
                  </label>
                  <textarea
                    id="session-reflection"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    rows={5}
                    className="input-field"
                    placeholder={t("care.reflectionPh")}
                  />
                  <Button
                    disabled={!reflection.trim()}
                    onClick={() => setSavedReflection(reflection.trim())}
                  >
                    <ClipboardCheck className="size-4 mr-1.5" />
                    <span>{t("care.saveReflection")}</span>
                  </Button>

                  {savedReflection && (
                    <div role="status" className="border-l-2 border-primary pl-4">
                      <p className="text-sm font-semibold">{t("care.yourReflection")}</p>
                      <p className="mt-2 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                        {savedReflection}
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold">{t("care.beforeNextTitle")}</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground leading-relaxed">
                      {(translations.care?.beforeNextTips || []).map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full" onClick={book}>
                    <CalendarPlus className="size-4 mr-1.5" />
                    <span>{t("care.meetAgain")}</span>
                  </Button>
                </>
              )}
            </TabsContent>

            {/* Checkin Tab */}
            <TabsContent value="checkin" className="mt-6 space-y-5">
              <h3 className="text-xl font-semibold">{t("care.checkinTitle")}</h3>
              <p className="text-sm text-muted-foreground">{t("care.checkinSub")}</p>
              <div className="grid grid-cols-2 gap-2">
                {moodKeys.map((value) => {
                  const localizedMood = t(`care.moods.${value}`) || value;
                  return (
                    <Button
                      key={value}
                      variant={mood === value ? "default" : "outline"}
                      aria-pressed={mood === value}
                      onClick={() => setMood(value)}
                    >
                      {localizedMood}
                    </Button>
                  );
                })}
              </div>

              {mood && (
                <p role="status" className="rounded-lg bg-muted p-4 text-sm leading-relaxed">
                  {t("care.moodResponse", {
                    mood: (t(`care.moods.${mood}`) || mood).toLowerCase(),
                  })}
                </p>
              )}

              <p className="border-t pt-5 text-sm text-muted-foreground leading-relaxed">
                {t("care.urgentHelp", {
                  telemanas: "Tele-MANAS 14416",
                  emergency: "112",
                })}
              </p>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </>
  );
}
