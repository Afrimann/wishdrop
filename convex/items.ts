import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const addItem = mutation({
  args: {
    wishlistId: v.id("wishlists"),
    title: v.string(),
    imageId: v.optional(v.id("_storage")),
    price: v.number(),
    currency: v.union(v.literal("NGN"), v.literal("USD"), v.literal("GBP")),
    storeUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const wishlist = await ctx.db.get(args.wishlistId);
    if (!wishlist) {
      throw new ConvexError("Wishlist not found.");
    }

    const sanitizedPrice = Number.isNaN(args.price)
      ? 0
      : Math.max(0, args.price);

    const id = await ctx.db.insert("items", {
      wishlistId: args.wishlistId,
      title: args.title,
      imageId: args.imageId,
      price: sanitizedPrice,
      currency: args.currency,
      storeUrl: args.storeUrl,
      isClaimed: false,
      createdAt: Date.now(),
    });

    return id;
  },
});

export const getByWishlist = query({
  args: {
    wishlistId: v.id("wishlists"),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("items")
      .withIndex("by_wishlist", (q) => q.eq("wishlistId", args.wishlistId))
      .collect();

    const sorted = items.sort((a, b) => b.createdAt - a.createdAt);
    return Promise.all(
      sorted.map(async (item) => ({
        ...item,
        imageUrl: item.imageId ? await ctx.storage.getUrl(item.imageId) : null,
      })),
    );
  },
});
