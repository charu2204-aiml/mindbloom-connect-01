import { useState, useEffect, useRef } from "react";
import {
  Navigation,
  MapPin,
  Car,
  Clock,
  Compass,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { type TripStatus, TRIP_STATUSES, getStatusProgress } from "@/data/tracking";
import { type CareSession } from "@/lib/care-journey";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export function LiveTracking({ sessions }: { sessions: CareSession[] }) {
  const [showDemoPreview, setShowDemoPreview] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<TripStatus>("Awaiting assignment");
  const [simulatedProgress, setSimulatedProgress] = useState(15);
  const [isSimulating, setIsSimulating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { t } = useCare();

  const activeSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;
  const isTrackingActive = !!activeSession || showDemoPreview;

  const consultantName = activeSession ? activeSession.consultant : "Dr. Ananya Krishnan";

  // Synchronize base progress with status
  const handleStatusChange = (status: TripStatus) => {
    setCurrentStatus(status);
    setSimulatedProgress(getStatusProgress(status));
    setIsSimulating(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Automated progress simulation with cleanup
  useEffect(() => {
    if (isSimulating) {
      timerRef.current = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= 100) {
            setIsSimulating(false);
            setCurrentStatus("Trip completed");
            return 100;
          }
          const next = prev + 5;
          if (next >= 90) setCurrentStatus("Arrived");
          else if (next >= 40) setCurrentStatus("On the way");
          else if (next >= 20) setCurrentStatus("Rider assigned");
          return next;
        });
      }, 700);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSimulating]);

  // SVG route path calculations: viewBox 0 0 600 240
  const pickupCoords = { x: 70, y: 170 };
  const clinicCoords = { x: 530, y: 70 };
  const tCoord = simulatedProgress / 100;
  const p0 = pickupCoords;
  const p1 = { x: 200, y: 50 };
  const p2 = { x: 380, y: 200 };
  const p3 = clinicCoords;

  const carX =
    Math.pow(1 - tCoord, 3) * p0.x +
    3 * Math.pow(1 - tCoord, 2) * tCoord * p1.x +
    3 * (1 - tCoord) * Math.pow(tCoord, 2) * p2.x +
    Math.pow(tCoord, 3) * p3.x;

  const carY =
    Math.pow(1 - tCoord, 3) * p0.y +
    3 * Math.pow(1 - tCoord, 2) * tCoord * p1.y +
    3 * (1 - tCoord) * Math.pow(tCoord, 2) * p2.y +
    Math.pow(tCoord, 3) * p3.y;

  return (
    <section id="tracking" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t("tracking.badge")}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl">{t("tracking.title")}</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
            {t("tracking.sub")}
          </p>
        </div>

        {/* State Toggle for prototype inspection */}
        <div className="flex items-center gap-2">
          {activeSession ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              <CheckCircle2 className="size-3.5" />
              <span>Live Trip Session</span>
            </span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDemoPreview((prev) => !prev)}
              className="text-xs rounded-full"
            >
              {showDemoPreview ? "Reset to Default (Unassigned)" : "Preview Sample Route"}
            </Button>
          )}
        </div>
      </div>

      {!isTrackingActive ? (
        /* Empty State */
        <div className="mt-8 rounded-2xl border bg-card p-8 md:p-12 text-center shadow-soft">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-soft text-primary">
            <Compass className="size-8" />
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <span>Assignment Status:</span>{" "}
            <strong className="text-foreground">No active trip</strong>
          </div>
          <h3 className="mt-4 text-2xl font-display font-semibold">No Active Journey to Track</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Live route visualization and arrival estimates become active once you request an
            in-person appointment with a travel package.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/consultants";
                }
              }}
            >
              Find a Consultant to Book
            </Button>
            <Button variant="outline" onClick={() => setShowDemoPreview(true)}>
              Simulate Route (Demo)
            </Button>
          </div>
        </div>
      ) : (
        /* Active Tracking Dashboard */
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main Visual Route Map & Simulation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Interactive Map Canvas */}
            <div className="rounded-2xl border bg-card p-4 md:p-6 shadow-soft space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground">
                    <span>Demo tracking — simulated location</span> ·{" "}
                    <span>{consultantName} Practice</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5 text-primary" />
                  <span>
                    Estimated Transit: <strong>18 mins (Demo Route)</strong> ·{" "}
                    <span>11.2 km (Sample)</span>
                  </span>
                </div>
              </div>

              {/* Simulated SVG Route Canvas */}
              <div
                role="region"
                aria-label="Route map visualization"
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-soft via-card to-soft p-4 border border-border/60"
              >
                <svg
                  viewBox="0 0 600 240"
                  className="w-full h-auto drop-shadow-xs select-none"
                  aria-hidden="true"
                >
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        className="text-border/30"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="600" height="240" fill="url(#grid)" />

                  {/* Route background path */}
                  <path
                    d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`}
                    fill="none"
                    stroke="currentColor"
                    className="text-muted-foreground/30"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* Active progress path */}
                  <path
                    d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`}
                    fill="none"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="8"
                    strokeDasharray="600"
                    strokeDashoffset={600 - (600 * simulatedProgress) / 100}
                    strokeLinecap="round"
                  />

                  {/* Pickup Marker */}
                  <g transform={`translate(${pickupCoords.x}, ${pickupCoords.y})`}>
                    <circle r="14" className="fill-card stroke-primary" strokeWidth="3" />
                    <circle r="6" className="fill-primary" />
                    <text
                      y="28"
                      textAnchor="middle"
                      className="text-[10px] font-semibold fill-foreground"
                    >
                      Patient Doorstep
                    </text>
                  </g>

                  {/* Destination Clinic Marker */}
                  <g transform={`translate(${clinicCoords.x}, ${clinicCoords.y})`}>
                    <circle r="14" className="fill-card stroke-emerald-600" strokeWidth="3" />
                    <circle r="6" className="fill-emerald-600" />
                    <text
                      y="28"
                      textAnchor="middle"
                      className="text-[10px] font-semibold fill-foreground"
                    >
                      Clinic Destination
                    </text>
                  </g>

                  {/* Animated Simulated Cab Vehicle */}
                  <g transform={`translate(${carX}, ${carY})`}>
                    <circle
                      r="18"
                      className="fill-primary text-primary-foreground shadow-lg animate-pulse"
                    />
                    <Car className="size-5 text-primary-foreground -translate-x-2.5 -translate-y-2.5" />
                  </g>
                </svg>
              </div>

              {/* Route Legend */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
                <span className="font-semibold text-foreground">Route Legend:</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-primary" />
                  <span>Pickup Location</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-primary/70" />
                  <span>Active Cab Transit</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-emerald-600" />
                  <span>Clinic Destination</span>
                </span>
              </div>
            </div>

            {/* Interactive Simulation Controls */}
            <div className="rounded-2xl border bg-card p-4 md:p-6 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">Simulation Controls (Prototype Test)</h4>
                  <p className="text-xs text-muted-foreground">Unavailable in demo mode</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant={isSimulating ? "secondary" : "default"}
                    onClick={() => setIsSimulating((prev) => !prev)}
                    className="text-xs gap-1.5"
                  >
                    {isSimulating ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                    <span>{isSimulating ? "Pause" : "Simulate Route (Demo)"}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsSimulating(false);
                      setCurrentStatus("Awaiting assignment");
                      setSimulatedProgress(15);
                      if (timerRef.current) clearInterval(timerRef.current);
                    }}
                    className="text-xs gap-1"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Reset</span>
                  </Button>
                </div>
              </div>

              {/* Progress Bar with Percentage */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-muted-foreground">Progress:</span>
                  <span className="text-primary font-bold">{simulatedProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${simulatedProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Status Stages & Information Panel */}
          <div className="space-y-6">
            {/* Status Steps Stepper */}
            <div className="rounded-2xl border bg-card p-6 shadow-soft space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Trip Status
              </h4>
              <div className="space-y-3">
                {TRIP_STATUSES.map((status, index) => {
                  const isCurrent = currentStatus === status;
                  const isPassed = getStatusProgress(status) <= simulatedProgress;

                  return (
                    <button
                      key={status}
                      type="button"
                      aria-label={status}
                      onClick={() => handleStatusChange(status)}
                      className={`w-full text-left flex items-start gap-3 rounded-xl p-2.5 transition-all ${
                        isCurrent ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/40"
                      }`}
                    >
                      <div
                        className={`mt-0.5 grid size-6 place-items-center rounded-full text-xs font-bold shrink-0 ${
                          isCurrent
                            ? "bg-primary text-primary-foreground"
                            : isPassed
                              ? "bg-emerald-600 text-white"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isPassed && !isCurrent ? "✓" : index + 1}
                      </div>
                      <div>
                        <span
                          className={`text-xs font-semibold block ${
                            isCurrent
                              ? "text-primary"
                              : isPassed
                                ? "text-foreground"
                                : "text-muted-foreground"
                          }`}
                        >
                          {status}
                        </span>
                        <span className="text-[11px] text-muted-foreground line-clamp-1 block">
                          Unavailable in demo mode
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prototype Simulation Disclosure */}
            <div className="rounded-2xl border bg-soft p-5 shadow-xs space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-primary">
                <ShieldAlert className="size-4" />
                <span>Simulated Demonstration Notice</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Map and coordinates shown are illustrative SVG representations for prototype
                interface review. Real journeys use real-time GPS telemetry via map services.
              </p>
            </div>

            {/* Cross-Feature Links */}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-between text-xs"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/rider";
                  }
                }}
              >
                <span>View Assigned Rider Details</span>
                <ArrowRight className="size-3.5" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between text-xs"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/care";
                  }
                }}
              >
                <span>View Care Journey & Aftercare</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
