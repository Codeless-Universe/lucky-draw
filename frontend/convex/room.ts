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
      .filter((q) =>
        q.and(q.eq(q.field("ownerSubject"), args.ownerSubject), q.eq(q.field("memberSubject"), identity?.subject)),
      )
      .collect();

    if (!list || list.length == 0) {
      await ctx.db.insert(ROOM_MEMBER, {
        ownerSubject: args.ownerSubject,
        currentUserSubject: args.ownerSubject == identity?.subject ? args.ownerSubject : undefined,
        memberSubject: identity?.subject,
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
        q.and(q.eq(q.field("ownerSubject"), args.ownerSubject), q.lt(q.field("lastAt"), Date.now() + 1000 * 60 * 5)),
      )
      .collect();

    return list;
  },
});

export const play = mutation({
  args: { ownerSubject: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) {
      return { code: -1, msg: "Please login." };
    }

    const list = await ctx.db
      .query(ROOM_MEMBER)
      .filter((q) =>
        q.and(q.eq(q.field("ownerSubject"), args.ownerSubject), q.lt(q.field("lastAt"), Date.now() + 1000 * 60 * 5)),
      )
      .collect();

    const ownerRecord = list[0];
    if (ownerRecord?.currentUser != identity.subject) {
      return { code: -1, msg: "Now the player is not you." };
    }

    //写入一个随机数

    //将游戏记录写到新表里

    return true;
  },
});
