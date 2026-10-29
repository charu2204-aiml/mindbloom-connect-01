/**
 * Smoothly scrolls to a section ID accounting for user's motion preferences
 */
export function smoothScrollTo(elementId: string): void {
  if (typeof window === "undefined") return;
  const el = document.getElementById(elementId);
  if (el) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }
}
