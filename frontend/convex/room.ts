import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const ROOM_MEMBER = "room_member";
// Create a new task with the given text
export const joinWheel = mutation({
  args: { ownerSubject: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) {
      return { code: -1, msg: "Please login." };
    }

    const list = await ctx.db
      .query(ROOM_MEMBER)
      .filter((q) => q.and(q.eq(q.field("ownerId"), args.ownerSubject), q.eq(q.field("memberId"), identity?.subject)))
      .collect();

    if (!list || list.length == 0) {
      await ctx.db.insert(ROOM_MEMBER, {
        ownerId: args.ownerSubject,
        memberId: identity?.subject,
        lastAt: Date.now(),
        status: "PLAY",
        userIdentity: JSON.parse(JSON.stringify(identity)),
      });
    } else {
      let id = list[0]._id;
      await ctx.db.patch(id as Id<"room_member">, {
        lastAt: Date.now(),
        userIdentity: JSON.parse(JSON.stringify(identity)),
      });
    }
    return true;
  },
});

export const queryMembers = query({
  args: { ownerSubject: v.string() },
  handler: async (ctx, args) => {
    const list = await ctx.db
      .query(ROOM_MEMBER)
      .filter((q) =>
        q.and(q.eq(q.field("ownerId"), args.ownerSubject), q.lt(q.field("lastAt"), Date.now() + 1000 * 60 * 10)),
      )
      .collect();

    return list;
  },
});
