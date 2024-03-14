import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const joinWheel = mutation({
  args: { ownerSubject: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) {
      return { code: -1, msg: "Please login." };
    }

    const list = await ctx.db
      .query("room_member")
      .filter((q) => q.add(q.eq(q.field("ownerId"), args.ownerSubject), q.eq(q.field("memberId"), identity?.subject)))
      .collect();

    if (!list || list.length == 0) {
      await ctx.db.insert("room_member", {
        ownerId: args.ownerSubject,
        memberId: identity?.subject,
        lastAt: Date.now(),
        status: "PLAY",
      });
    } else {
      let id = list[0]._id;
      await ctx.db.patch(id, { lastAt: Date.now() });
    }
    return true;
  },
});
