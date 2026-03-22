import type { EventType } from "./events";

type ThemeTokens = {
  accentText: string;
  badge: string;
  sectionTone: string;
  itemsTone: string;
  cardBorder: string;
  claimButton: string;
  claimButtonHover: string;
  layoutGap: string;
  sectionPadding: string;
};

export const EVENT_THEME: Record<EventType, ThemeTokens> = {
  birthday: {
    accentText: "text-blue-600",
    badge: "bg-blue-50 text-blue-700",
    sectionTone: "bg-white",
    itemsTone: "bg-white",
    cardBorder: "border-slate-200",
    claimButton: "bg-blue-600 text-white",
    claimButtonHover: "hover:bg-blue-700",
    layoutGap: "gap-10",
    sectionPadding: "py-12",
  },
  wedding: {
    accentText: "text-slate-700",
    badge: "bg-slate-100 text-slate-600",
    sectionTone: "bg-white",
    itemsTone: "bg-white",
    cardBorder: "border-slate-200",
    claimButton: "bg-blue-600/90 text-white",
    claimButtonHover: "hover:bg-blue-700",
    layoutGap: "gap-12",
    sectionPadding: "py-14",
  },
  graduation: {
    accentText: "text-slate-900",
    badge: "bg-blue-50 text-blue-800",
    sectionTone: "bg-white",
    itemsTone: "bg-white",
    cardBorder: "border-slate-300",
    claimButton: "bg-blue-700 text-white",
    claimButtonHover: "hover:bg-blue-800",
    layoutGap: "gap-10",
    sectionPadding: "py-12",
  },
  christmas: {
    accentText: "text-blue-700",
    badge: "bg-blue-50 text-blue-700",
    sectionTone: "bg-slate-50/60",
    itemsTone: "bg-slate-50/40",
    cardBorder: "border-slate-200",
    claimButton: "bg-blue-600 text-white",
    claimButtonHover: "hover:bg-blue-700",
    layoutGap: "gap-10",
    sectionPadding: "py-12",
  },
  party: {
    accentText: "text-blue-700",
    badge: "bg-blue-50 text-blue-700",
    sectionTone: "bg-white",
    itemsTone: "bg-white",
    cardBorder: "border-slate-200",
    claimButton: "bg-blue-600 text-white transition hover:-translate-y-0.5",
    claimButtonHover: "hover:bg-blue-700",
    layoutGap: "gap-10",
    sectionPadding: "py-12",
  },
  custom: {
    accentText: "text-blue-600",
    badge: "bg-blue-50 text-blue-700",
    sectionTone: "bg-white",
    itemsTone: "bg-white",
    cardBorder: "border-slate-200",
    claimButton: "bg-blue-600 text-white",
    claimButtonHover: "hover:bg-blue-700",
    layoutGap: "gap-10",
    sectionPadding: "py-12",
  },
};
