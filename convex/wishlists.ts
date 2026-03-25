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
    const identity = await ctx.auth.getUserIdentity();
    const ownerId = identity?.subject ?? undefined;
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
      ownerId,
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

export const getByOwner = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You must be signed in to view your wishlists.");
    }

    const items = await ctx.db
      .query("wishlists")
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .collect();

    return items.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getByUsernames = query({
  args: {
    usernames: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const unique = Array.from(
      new Set(args.usernames.map((name) => name.trim().toLowerCase())),
    ).filter(Boolean);

    const results = await Promise.all(
      unique.map(async (username) => {
        const wishlist = await ctx.db
          .query("wishlists")
          .withIndex("by_username", (q) => q.eq("username", username))
          .unique();
        return wishlist ?? null;
      }),
    );

    return results.filter(
      (item): item is NonNullable<(typeof results)[number]> => item !== null,
    );
  },
});
