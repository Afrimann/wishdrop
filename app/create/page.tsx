"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EventSelectorGrid } from "@/components/EventSelectorGrid";
import { EVENT_LABELS, EVENT_OPTIONS, type EventType } from "@/lib/events";

export default function CreatePage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<EventType | null>(null);
  const [customName, setCustomName] = useState("");
  const [error, setError] = useState("");

  const canContinue = useMemo(() => {
    if (!selectedType) return false;
    if (selectedType === "custom") return customName.trim().length > 0;
    return true;
  }, [selectedType, customName]);

  const handleContinue = () => {
    setError("");
    if (!selectedType) {
      setError("Select an event to continue.");
      return;
    }
    const eventName =
      selectedType === "custom"
        ? customName.trim()
        : EVENT_LABELS[selectedType];

    if (selectedType === "custom" && !eventName) {
      setError("Enter your event name to continue.");
      return;
    }

    const params = new URLSearchParams({
      eventType: selectedType,
      eventName,
    });

    router.push(`/create/details?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Step 1 of 2
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Choose your event
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            Select the event you&apos;re building a wishlist for. You can create
            a custom one too.
          </p>
        </div>
        <EventSelectorGrid
          events={EVENT_OPTIONS}
          selectedType={selectedType}
          onSelect={(type) => setSelectedType(type)}
          customName={customName}
          onCustomNameChange={(value) => setCustomName(value)}
        />
        {error ? (
          <p className="text-sm font-semibold text-red-600">{error}</p>
        ) : null}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            You can update details in the next step.
          </p>
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={!canContinue}
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Continue
          </motion.button>
        </div>
      </div>
    </div>
  );
}
