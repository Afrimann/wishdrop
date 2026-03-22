import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createWishlist = mutation({
  args: {
    name: v.string(),
    username: v.string(),
    eventType: v.string(),
    eventName: v.string(),
    eventDate: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedUsername = args.username.trim().toLowerCase();
    if (!/^[a-z0-9-]+$/.test(normalizedUsername)) {
      throw new ConvexError(
        "Usernames can only contain letters, numbers, and hyphens.",
      );
    }

    const existing = await ctx.db
      .query("wishlists")
      .withIndex("by_username", (q) => q.eq("username", normalizedUsername))
      .unique();

    if (existing) {
      throw new ConvexError("That username is already taken.");
    }

    const id = await ctx.db.insert("wishlists", {
      name: args.name.trim(),
      username: normalizedUsername,
      eventType: args.eventType,
      eventName: args.eventName.trim(),
      eventDate: args.eventDate,
      createdAt: Date.now(),
    });

    return id;
  },
});

export const getByUsername = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedUsername = args.username.trim().toLowerCase();
    const wishlist = await ctx.db
      .query("wishlists")
      .withIndex("by_username", (q) => q.eq("username", normalizedUsername))
      .unique();

    return wishlist ?? null;
  },
});
