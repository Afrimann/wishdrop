"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useUser,
} from "@clerk/nextjs";
import type { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { EVENT_LABELS, isEventType, type EventType } from "@/lib/events";
import { formatEventDate } from "@/lib/utils";

type WishlistDoc = Doc<"wishlists">;

const RECENT_KEY = "wishdrop_recent";

export default function WishlistsPage() {
  const { isSignedIn } = useUser();
  const [recentUsernames, setRecentUsernames] = useState<string[]>([]);

  const ownedWishlists = useQuery(
    api.wishlists.getByOwner,
    isSignedIn ? {} : "skip",
  );

  const recentWishlists = useQuery(
    api.wishlists.getByUsernames,
    recentUsernames.length > 0 ? { usernames: recentUsernames } : "skip",
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(RECENT_KEY);
    const parsed = stored ? (JSON.parse(stored) as string[]) : [];
    setRecentUsernames(parsed);
  }, []);

  const orderedRecent = useMemo(() => {
    if (!recentWishlists) return [];
    const map = new Map(recentWishlists.map((item) => [item.username, item]));
    return recentUsernames
      .map((username) => map.get(username))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
  }, [recentUsernames, recentWishlists]);
  const isRecentLoading =
    recentUsernames.length > 0 && recentWishlists === undefined;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 lg:px-10">
        <SignedOut>
          <section className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 text-sm text-blue-900">
            <p className="font-semibold">Want multiple wishlists?</p>
            <p className="mt-2 text-blue-800">
              Sign in to manage wishlists across devices and keep them in one
              place.
            </p>
            <SignInButton mode="modal">
              <button
                type="button"
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sign in to sync
              </button>
            </SignInButton>
          </section>
        </SignedOut>

        <SignedIn>
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                Your wishlists
              </h2>
              <span className="text-sm text-slate-500">
                {ownedWishlists?.length ?? 0} total
              </span>
            </div>
            {ownedWishlists === undefined ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`owned-loading-${index}`}
                    className="h-40 animate-pulse rounded-lg border border-slate-200 bg-slate-100"
                  />
                ))}
              </div>
            ) : ownedWishlists.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-sm text-slate-500">
                No wishlists yet. Create your first one.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ownedWishlists.map((wishlist) => (
                  <WishlistCard key={wishlist._id} wishlist={wishlist} />
                ))}
              </div>
            )}
          </section>
        </SignedIn>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">
              Recently viewed
            </h2>
            <span className="text-sm text-slate-500">
              {orderedRecent.length} total
            </span>
          </div>
          {isRecentLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`recent-loading-${index}`}
                  className="h-40 animate-pulse rounded-lg border border-slate-200 bg-slate-100"
                />
              ))}
            </div>
          ) : orderedRecent.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-sm text-slate-500">
              Visit a public wishlist to see it listed here.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {orderedRecent.map((wishlist) => (
                <WishlistCard key={wishlist._id} wishlist={wishlist} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function WishlistCard({ wishlist }: { wishlist: WishlistDoc }) {
  const eventType: EventType = isEventType(wishlist.eventType)
    ? wishlist.eventType
    : "custom";
  const eventName = wishlist.eventName || EVENT_LABELS[eventType];
  const dateLabel = wishlist.eventDate
    ? formatEventDate(wishlist.eventDate)
    : "Date not set";

  return (
    <Link
      href={`/${wishlist.username}`}
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {eventName}
        </p>
        <h3 className="text-lg font-semibold text-slate-900">
          {wishlist.name}&apos;s wishlist
        </h3>
      </div>
      <div className="text-sm text-slate-500">{dateLabel}</div>
      <span className="text-xs font-semibold text-blue-700">
        View wishlist
      </span>
    </Link>
  );
}
