"use client";

import { motion } from "framer-motion";
import type { EventType } from "@/lib/events";
import { EVENT_THEME } from "@/lib/theme";
import { formatEventDate } from "@/lib/utils";

type WishlistHeroProps = {
  name: string;
  eventName: string;
  eventDate: string;
  eventType: EventType;
  username: string;
};

export function WishlistHero({
  name,
  eventName,
  eventDate,
  eventType,
  username,
}: WishlistHeroProps) {
  const theme = EVENT_THEME[eventType];
  const formattedDate = formatEventDate(eventDate);

  return (
    <section className={`${theme.sectionTone} border-b border-slate-200/70`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 lg:px-10 lg:py-14"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.badge}`}
          >
            Public wishlist
          </span>
          <span className="text-xs font-medium text-slate-500">
            Shareable link: /{username}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            {name}&apos;s {eventName} Wishlist
          </h1>
          {formattedDate ? (
            <p className={`text-sm font-semibold ${theme.accentText}`}>
              Event date: {formattedDate}
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              Event date not specified
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
