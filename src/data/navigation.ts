import {
  Search,
  ClipboardCheck,
  Info,
  Car,
  Navigation,
  Package,
  Home,
  Sparkles,
  Utensils,
  Wind,
} from "lucide-react";
import type { ComponentType } from "react";

export type NavDestination = {
  id: string;
  name: string;
  shortLabel: string;
  type: "section" | "route";
  target: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
};

// 10 Full Dedicated Menu Destinations in Exact Requested Order
export const SIDEBAR_ITEMS: NavDestination[] = [
  {
    id: "home",
    name: "Home",
    shortLabel: "Home",
    type: "route",
    target: "/",
    to: "/",
    icon: Home,
  },
  {
    id: "how-it-works",
    name: "How It Works",
    shortLabel: "How",
    type: "route",
    target: "/how-it-works",
    to: "/how-it-works",
    icon: Sparkles,
  },
  {
    id: "consultants",
    name: "Find Your Consultant",
    shortLabel: "Find",
    type: "route",
    target: "/consultants",
    to: "/consultants",
    icon: Search,
  },
  {
    id: "packages",
    name: "Packages",
    shortLabel: "Packages",
    type: "route",
    target: "/packages",
    to: "/packages",
    icon: Package,
  },
  {
    id: "care",
    name: "Updates & Aftercare",
    shortLabel: "Aftercare",
    type: "route",
    target: "/care",
    to: "/care",
    icon: ClipboardCheck,
  },
  {
    id: "about",
    name: "About TheraPeace",
    shortLabel: "About",
    type: "route",
    target: "/about",
    to: "/about",
    icon: Info,
  },
  {
    id: "rider",
    name: "Rider Details",
    shortLabel: "Rider",
    type: "route",
    target: "/rider",
    to: "/rider",
    icon: Car,
  },
  {
    id: "tracking",
    name: "Live Tracking",
    shortLabel: "Tracking",
    type: "route",
    target: "/tracking",
    to: "/tracking",
    icon: Navigation,
  },
  {
    id: "food-travel",
    name: "Food & Travel Packages",
    shortLabel: "Logistics",
    type: "route",
    target: "/food-travel",
    to: "/food-travel",
    icon: Utensils,
  },
  {
    id: "relax",
    name: "Relax",
    shortLabel: "Relax",
    type: "route",
    target: "/relax",
    to: "/relax",
    icon: Wind,
  },
];

// Preserved for Phase 1 backwards compatibility and mobile bottom bar
export const NAV_ITEMS = [
  {
    id: "consultants",
    name: "Find Your Consultant",
    shortLabel: "Find",
    type: "section" as const,
    target: "consultants",
    icon: Search,
  },
  {
    id: "care",
    name: "Updates & Aftercare",
    shortLabel: "Aftercare",
    type: "section" as const,
    target: "care",
    icon: ClipboardCheck,
  },
  {
    id: "about",
    name: "About TheraPeace",
    shortLabel: "About",
    type: "route" as const,
    target: "/about",
    icon: Info,
  },
  {
    id: "rider",
    name: "Rider Details",
    shortLabel: "Rider",
    type: "section" as const,
    target: "rider",
    icon: Car,
  },
  {
    id: "tracking",
    name: "Live Tracking",
    shortLabel: "Tracking",
    type: "section" as const,
    target: "tracking",
    icon: Navigation,
  },
  {
    id: "packages",
    name: "Food & Travel Packages",
    shortLabel: "Packages",
    type: "section" as const,
    target: "packages",
    icon: Package,
  },
];
