import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  wishlists: defineTable({
    name: v.string(),
    username: v.string(),
    ownerId: v.optional(v.string()),
    eventType: v.string(),
    eventName: v.string(),
    eventDate: v.string(),
    createdAt: v.number(),
  })
    .index("by_username", ["username"])
    .index("by_owner", ["ownerId"]),
  items: defineTable({
    wishlistId: v.id("wishlists"),
    title: v.string(),
    imageId: v.optional(v.id("_storage")),
    price: v.number(),
    currency: v.optional(
      v.union(v.literal("NGN"), v.literal("USD"), v.literal("GBP")),
    ),
    storeUrl: v.optional(v.string()),
    isClaimed: v.boolean(),
    createdAt: v.number(),
  }).index("by_wishlist", ["wishlistId"]),
  claims: defineTable({
    itemId: v.id("items"),
    claimedByName: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_item", ["itemId"]),
});
