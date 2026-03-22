import type { Id } from "../convex/_generated/dataModel";

export type Wishlist = {
  _id: Id<"wishlists">;
  name: string;
  username: string;
  eventType: string;
  eventName: string;
  eventDate: string;
  createdAt: number;
};

export type Item = {
  _id: Id<"items">;
  wishlistId: Id<"wishlists">;
  title: string;
  imageId?: Id<"_storage">;
  imageUrl?: string | null;
  price: number;
  storeUrl?: string;
  isClaimed: boolean;
  createdAt: number;
};
