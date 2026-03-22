"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type ClaimModalProps = {
  open: boolean;
  itemTitle: string;
  onClose: () => void;
  onConfirm: (claimedByName?: string) => Promise<void>;
  isLoading: boolean;
  error?: string;
};

export function ClaimModal({
  open,
  itemTitle,
  onClose,
  onConfirm,
  isLoading,
  error,
}: ClaimModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Claim {itemTitle}
              </h2>
              <p className="text-sm text-slate-500">
                Add your name so the owner knows who is bringing the gift
                (optional).
              </p>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Your name (optional)
                <input
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="e.g. Tobi"
                  maxLength={40}
                />
              </label>
              {error ? (
                <p className="text-sm font-semibold text-red-600">{error}</p>
              ) : null}
              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                  onClick={() => void onConfirm(name.trim() || undefined)}
                  disabled={isLoading}
                >
                  {isLoading ? "Claiming..." : "Confirm claim"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
