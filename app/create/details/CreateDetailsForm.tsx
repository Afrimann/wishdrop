"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { api } from "@/convex/_generated/api";
import { EVENT_LABELS, isEventType, type EventType } from "@/lib/events";
import { slugifyUsername } from "@/lib/utils";

type FormState = {
  name: string;
  username: string;
  eventDate: string;
};

export default function CreateDetailsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createWishlist = useMutation(api.wishlists.createWishlist);
  const [form, setForm] = useState<FormState>({
    name: "",
    username: "",
    eventDate: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { eventType, eventName } = useMemo(() => {
    const rawType = searchParams.get("eventType") ?? "";
    const rawName = searchParams.get("eventName") ?? "";
    const validType: EventType = isEventType(rawType)
      ? rawType
      : "custom";
    const name =
      rawName.trim().length > 0 ? rawName : EVENT_LABELS[validType];
    return { eventType: validType, eventName: name };
  }, [searchParams]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!eventType || !eventName) {
      setError("Return to the previous step to pick an event.");
      return;
    }

    if (!form.name.trim()) {
      setError("Add the wishlist owner name.");
      return;
    }

    if (!form.username.trim()) {
      setError("Choose a username for your public link.");
      return;
    }

    if (!form.eventDate.trim()) {
      setError("Pick an event date.");
      return;
    }

    setIsSubmitting(true);
    try {
      const username = slugifyUsername(form.username);
      await createWishlist({
        name: form.name.trim(),
        username,
        eventType,
        eventName,
        eventDate: form.eventDate,
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem("wishdrop_owner", username);
      }

      router.push(`/${username}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to create wishlist.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Step 2 of 2
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Create your wishlist
          </h1>
          <p className="text-base text-slate-600">
            You selected <span className="font-semibold">{eventName}</span>.
            Add the details below.
          </p>
        </div>
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Wishlist owner name
            <input
              className="rounded-lg border border-slate-200 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. Adeola"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              maxLength={40}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Username (public link)
            <input
              className="rounded-lg border border-slate-200 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="e.g. adeola-2026"
              value={form.username}
              onChange={(event) =>
                handleChange("username", slugifyUsername(event.target.value))
              }
              maxLength={32}
            />
            <span className="text-xs font-normal text-slate-500">
              This becomes /{form.username || "your-link"}
            </span>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Event date
            <input
              type="date"
              className="rounded-lg border border-slate-200 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={form.eventDate}
              onChange={(event) => handleChange("eventDate", event.target.value)}
            />
          </label>
          {error ? (
            <p className="text-sm font-semibold text-red-600">{error}</p>
          ) : null}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create wishlist"}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
