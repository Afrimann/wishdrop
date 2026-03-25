import type { Id } from "../convex/_generated/dataModel";

export type Wishlist = {
  _id: Id<"wishlists">;
  _creationTime: number;
  name: string;
  username: string;
  ownerId?: string;
  eventType: string;
  eventName: string;
  eventDate: string;
  createdAt: number;
};

export type CurrencyCode = "NGN" | "USD" | "GBP";

export type Item = {
  _id: Id<"items">;
  wishlistId: Id<"wishlists">;
  title: string;
  imageId?: Id<"_storage">;
  imageUrl?: string | null;
  price: number;
  currency?: CurrencyCode;
  storeUrl?: string;
  isClaimed: boolean;
  createdAt: number;
};
