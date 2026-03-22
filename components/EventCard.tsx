"use client";

import { motion } from "framer-motion";

type EventCardProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function EventCard({ label, selected, onSelect }: EventCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -2 }}
      className={`flex min-h-[92px] w-full items-center justify-between rounded-lg border px-5 py-4 text-left transition ${
        selected
          ? "border-blue-600 bg-blue-50/50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
      aria-pressed={selected}
    >
      <span className="text-base font-semibold text-slate-900">{label}</span>
      <span
        className={`text-xs font-semibold ${
          selected ? "text-blue-700" : "text-slate-400"
        }`}
      >
        {selected ? "Selected" : "Select"}
      </span>
    </motion.button>
  );
}
