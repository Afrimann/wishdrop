import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const claimItem = mutation({
  args: {
    itemId: v.id("items"),
    claimedByName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.itemId);

    if (!item) {
      throw new ConvexError("Item not found.");
    }

    const wishlist = await ctx.db.get(item.wishlistId);
    const identity = await ctx.auth.getUserIdentity();
    if (
      wishlist?.ownerId &&
      identity?.subject &&
      wishlist.ownerId === identity.subject
    ) {
      throw new ConvexError("Owners cannot claim their own gifts.");
    }

    if (item.isClaimed) {
      throw new ConvexError("This item has already been claimed.");
    }

    await ctx.db.patch(args.itemId, { isClaimed: true });

    await ctx.db.insert("claims", {
      itemId: args.itemId,
      claimedByName: args.claimedByName,
      createdAt: Date.now(),
    });

    return { success: true };
  },
});
