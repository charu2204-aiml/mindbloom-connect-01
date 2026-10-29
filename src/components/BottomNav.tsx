import { useLocation, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { NAV_ITEMS } from "@/data/navigation";
import { useCare } from "@/context/CareContext";
import { cn } from "@/lib/utils";

const bottomNavKeyMap: Record<string, { label: string; short: string }> = {
  consultants: { label: "nav.consultants", short: "nav.findShort" },
  care: { label: "nav.care", short: "nav.careShort" },
  about: { label: "nav.about", short: "nav.aboutShort" },
  rider: { label: "nav.rider", short: "nav.riderShort" },
  tracking: { label: "nav.tracking", short: "nav.trackingShort" },
  packages: { label: "nav.foodTravel", short: "nav.packagesShort" },
};

function useActiveNav() {
  let pathname = "/";
  try {
    const location = useLocation();
    pathname = location?.pathname ?? "/";
  } catch {
    pathname = "/";
  }

  const [activeId, setActiveId] = useState<string>("consultants");

  useEffect(() => {
    if (pathname.includes("consultants")) setActiveId("consultants");
    else if (pathname.includes("care")) setActiveId("care");
    else if (pathname.includes("about")) setActiveId("about");
    else if (pathname.includes("rider")) setActiveId("rider");
    else if (pathname.includes("tracking")) setActiveId("tracking");
    else if (pathname.includes("packages") || pathname.includes("food-travel"))
      setActiveId("packages");
    else setActiveId("");
  }, [pathname]);

  return { activeId, setActiveId };
}

function useNavHandler(setActiveId: (id: string) => void) {
  let router: ReturnType<typeof useRouter> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    router = useRouter();
  } catch {
    router = null;
  }

  const handleNavigate = useCallback(
    (item: (typeof NAV_ITEMS)[0]) => {
      setActiveId(item.id);
      const routeMap: Record<string, string> = {
        consultants: "/consultants",
        care: "/care",
        about: "/about",
        rider: "/rider",
        tracking: "/tracking",
        packages: "/food-travel",
      };

      const dest = routeMap[item.id] ?? `/#${item.target}`;
      if (router?.navigate) {
        router.navigate({ to: dest });
      } else if (typeof window !== "undefined") {
        window.location.href = dest;
      }
    },
    [router, setActiveId],
  );

  return handleNavigate;
}

/**
 * Mobile-only bottom navigation bar (hidden on >= md screens).
 */
export function BottomNav() {
  const { activeId, setActiveId } = useActiveNav();
  const handleNavigate = useNavHandler(setActiveId);
  const { t } = useCare();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-background/95 backdrop-blur-md md:hidden shadow-lg select-none"
    >
      <div className="flex h-16 items-center justify-around px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;
          const itemKeys = bottomNavKeyMap[item.id];
          const localizedShort = itemKeys ? t(itemKeys.short) : item.shortLabel;
          const localizedName = itemKeys ? t(itemKeys.label) : item.name;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item)}
              aria-label={localizedName}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-1 px-1 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && <span className="absolute top-1 size-1 rounded-full bg-primary" />}
              <Icon
                className={cn(
                  "size-4 shrink-0 transition-transform",
                  isActive ? "scale-110 text-primary" : "text-muted-foreground",
                )}
              />
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-[58px]">
                {localizedShort}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
