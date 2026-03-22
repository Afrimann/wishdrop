"use client";

import type { EventOption, EventType } from "@/lib/events";
import { EventCard } from "./EventCard";

type EventSelectorGridProps = {
  events: EventOption[];
  selectedType: EventType | null;
  onSelect: (type: EventType) => void;
  customName: string;
  onCustomNameChange: (value: string) => void;
};

export function EventSelectorGrid({
  events,
  selectedType,
  onSelect,
  customName,
  onCustomNameChange,
}: EventSelectorGridProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard
            key={event.type}
            label={event.label}
            selected={selectedType === event.type}
            onSelect={() => onSelect(event.type)}
          />
        ))}
      </div>
      {selectedType === "custom" && (
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Enter your event name
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="e.g. Housewarming"
            value={customName}
            onChange={(event) => onCustomNameChange(event.target.value)}
            maxLength={40}
          />
        </label>
      )}
    </div>
  );
}
