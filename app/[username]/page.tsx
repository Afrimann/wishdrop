"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { WishlistHero } from "@/components/WishlistHero";
import { GiftCard } from "@/components/GiftCard";
import { ClaimModal } from "@/components/ClaimModal";
import { EVENT_LABELS, isEventType, type EventType } from "@/lib/events";
import { EVENT_THEME } from "@/lib/theme";
import type { Item } from "@/lib/types";
import { slugifyUsername } from "@/lib/utils";

type ItemForm = {
  title: string;
  price: string;
  storeUrl: string;
};

export default function PublicWishlistPage() {
  const params = useParams<{ username: string }>();
  const username = params?.username ?? "";
  const normalizedUsername = slugifyUsername(username);
  const wishlist = useQuery(api.wishlists.getByUsername, {
    username: normalizedUsername,
  });
  const items = useQuery(
    api.items.getByWishlist,
    wishlist ? { wishlistId: wishlist._id } : "skip",
  );
  const addItem = useMutation(api.items.addItem);
  const claimItem = useMutation(api.claims.claimItem);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [claimError, setClaimError] = useState("");
  const [isClaiming, setIsClaiming] = useState(false);
  const [itemForm, setItemForm] = useState<ItemForm>({
    title: "",
    price: "",
    storeUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [itemError, setItemError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wishdrop_owner");
    setIsOwner(stored === normalizedUsername);
  }, [normalizedUsername]);

  const eventType: EventType = useMemo(() => {
    if (!wishlist) return "custom";
    return isEventType(wishlist.eventType) ? wishlist.eventType : "custom";
  }, [wishlist]);

  const eventName = wishlist?.eventName ?? EVENT_LABELS[eventType];
  const theme = EVENT_THEME[eventType];

  const handleAddItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!wishlist) return;
    setItemError("");

    if (!itemForm.title.trim()) {
      setItemError("Add a gift title.");
      return;
    }

    const priceValue = Number(itemForm.price);

    setIsAdding(true);
    try {
      const imageId = imageFile ? await uploadImage(imageFile) : undefined;
      await addItem({
        wishlistId: wishlist._id,
        title: itemForm.title.trim(),
        imageId,
        price: Number.isNaN(priceValue) ? 0 : priceValue,
        storeUrl: itemForm.storeUrl.trim() || undefined,
      });
      setItemForm({ title: "", price: "", storeUrl: ""});
      setImageFile(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to add item.";
      setItemError(message);
    } finally {
      setIsAdding(false);
    }
  };

  const uploadImage = async (file: File): Promise<Id<"_storage">> => {
    const uploadUrl = await generateUploadUrl({});
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!response.ok) {
      throw new Error("Unable to upload image.");
    }
    const { storageId } = (await response.json()) as { storageId: string };
    return storageId as Id<"_storage">;
  };

  const handleClaimConfirm = async (claimedByName?: string) => {
    if (!selectedItem) return;
    setClaimError("");
    setIsClaiming(true);
    try {
      await claimItem({
        itemId: selectedItem._id,
        claimedByName,
      });
      setSelectedItem(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to claim this gift.";
      setClaimError(message);
    } finally {
      setIsClaiming(false);
    }
  };

  if (wishlist === undefined) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 lg:px-10">
          <div className="h-8 w-48 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-72 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-20 text-center lg:px-10">
          <h1 className="text-3xl font-semibold">Wishlist not found</h1>
          <p className="text-base text-slate-600">
            We couldn&apos;t find that wishlist. Double-check the link or create
            a new one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <WishlistHero
        name={wishlist.name}
        eventName={eventName}
        eventDate={wishlist.eventDate}
        eventType={eventType}
        username={wishlist.username}
      />

      <div className={theme.itemsTone}>
        <div
          className={`mx-auto flex w-full max-w-6xl flex-col px-6 lg:px-10 ${theme.sectionPadding} ${theme.layoutGap}`}
        >
          {isOwner ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-slate-900">
                Add wishlist items
              </h2>
              <p className="text-sm text-slate-500">
                Add gifts you want friends to claim.
              </p>
            </div>
            <form
              onSubmit={handleAddItem}
              className="mt-6 grid gap-4 md:grid-cols-2"
            >
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Title
                <input
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={itemForm.title}
                  onChange={(event) =>
                    setItemForm((prev) => ({
                      ...prev,
                      title: event.target.value,
                    }))
                  }
                  maxLength={80}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Gift image
                <input
                  type="file"
                  accept="image/*"
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  onChange={(event) =>
                    setImageFile(event.target.files?.[0] ?? null)
                  }
                />
                <span className="text-xs font-normal text-slate-500">
                  Upload a clear product photo (optional).
                </span>
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Price
                <input
                  type="number"
                  inputMode="numeric"
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={itemForm.price}
                  onChange={(event) =>
                    setItemForm((prev) => ({
                      ...prev,
                      price: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Store URL (optional)
                <input
                  className="rounded-lg border border-slate-200 px-4 py-3 text-base font-normal text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  value={itemForm.storeUrl}
                  onChange={(event) =>
                    setItemForm((prev) => ({
                      ...prev,
                      storeUrl: event.target.value,
                    }))
                  }
                />
              </label>
              <div className="flex items-end justify-between gap-3 md:col-span-2">
                {itemError ? (
                  <p className="text-sm font-semibold text-red-600">
                    {itemError}
                  </p>
                ) : (
                  <span className="text-xs text-slate-500">
                    Share the link once your list is ready.
                  </span>
                )}
                <button
                  type="submit"
                  disabled={isAdding}
                  className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isAdding ? "Adding..." : "Add item"}
                </button>
              </div>
            </form>
          </section>
          ) : (
            <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-sm text-slate-500">
              Want to add gifts? Open this wishlist from the device you used to
              create it.
            </section>
          )}

          <section className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Wishlist items
              </h2>
              <span className="text-sm text-slate-500">
                {items?.length ?? 0} items
              </span>
            </div>
            {items === undefined ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`loading-${index}`}
                    className="h-64 animate-pulse rounded-lg border border-slate-200 bg-slate-100"
                  />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center text-sm text-slate-500">
                No items yet. Add a gift to get started.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <GiftCard
                    key={item._id}
                    item={item}
                    onClaim={() => setSelectedItem(item)}
                    isClaiming={isClaiming && selectedItem?._id === item._id}
                    cardBorderClassName={theme.cardBorder}
                    claimButtonClassName={theme.claimButton}
                    claimButtonHoverClassName={theme.claimButtonHover}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <ClaimModal
        open={!!selectedItem}
        itemTitle={selectedItem?.title ?? "gift"}
        onClose={() => {
          setClaimError("");
          setSelectedItem(null);
        }}
        onConfirm={handleClaimConfirm}
        isLoading={isClaiming}
        error={claimError}
      />
    </div>
  );
}
