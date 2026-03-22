"use client";

import { motion } from "framer-motion";
import type { Item } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type GiftCardProps = {
  item: Item;
  onClaim: () => void;
  isClaiming: boolean;
  cardBorderClassName: string;
  claimButtonClassName: string;
  claimButtonHoverClassName: string;
};

export function GiftCard({
  item,
  onClaim,
  isClaiming,
  cardBorderClassName,
  claimButtonClassName,
  claimButtonHoverClassName,
}: GiftCardProps) {
  const priceLabel = formatPrice(item.price);

  return (
    <motion.article
      whileHover={{ y: -2 }}
      className={`flex h-full flex-col overflow-hidden rounded-lg border bg-white transition ${
        item.isClaimed ? cardBorderClassName : `${cardBorderClassName} shadow-sm`
      }`}
    >
      <div className="aspect-[4/3] w-full bg-slate-50">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-400">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-900">
            {item.title}
          </h3>
          {priceLabel ? (
            <p className="mt-2 text-sm text-slate-500">{priceLabel}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-3">
          {item.storeUrl ? (
            <a
              href={item.storeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-blue-700 transition hover:text-blue-800"
            >
              View store
            </a>
          ) : null}
          <button
            type="button"
            onClick={onClaim}
            disabled={item.isClaimed || isClaiming}
            className={`w-full rounded-md px-4 py-2 text-sm font-semibold transition ${
              item.isClaimed
                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                : `${claimButtonClassName} ${claimButtonHoverClassName}`
            }`}
            aria-label={
              item.isClaimed ? "Gift already claimed" : "Claim gift"
            }
          >
            {item.isClaimed ? "Claimed" : isClaiming ? "Claiming..." : "Claim"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
