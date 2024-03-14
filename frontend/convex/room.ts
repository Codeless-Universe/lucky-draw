import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const ROOM_MEMBER = "room_member";

export const createRoom = mutation({
  args: { wheelId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) {
      return { code: -1, msg: "Please login." };
    }

    // 创建房间
    const id = await ctx.db.insert("room", {
      ownerSubject: identity.subject,
      currentUserSubject: identity.subject,
      wheelId: args.wheelId,
      lastAt: Date.now(),
      userIdentity: JSON.parse(JSON.stringify(identity)),
    });

    // 创建成员
    await ctx.db.insert(ROOM_MEMBER, {
      roomId: id,
      memberSubject: identity?.subject,
      lastAt: Date.now(),
      status: "PLAY",
      userIdentity: JSON.parse(JSON.stringify(identity)),
    });

    return {
      id,
    };
  },
});

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
    // TODO OWNER 一定要加载出来

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
    if (ownerRecord?.currentUserSubject != identity.subject) {
      return { code: -1, msg: "Now the player is not you." };
    }

    let ownerId = ownerRecord._id;
    let ownerSubject = ownerRecord.ownerSubject;
    // 查找下一个用户
    let nextUserSubject = ownerSubject;
    list.forEach((item, index) => {
      if (item.memberSubject == ownerRecord.currentUserSubject) {
        let nextIndex = index + 1;
        if (nextIndex == list.length - 1) {
          nextIndex = 0;
        }
        nextUserSubject = list[nextIndex].memberSubject;
      }
    });

    //写入一个随机数
    const random = Math.random();
    await ctx.db.patch(ownerId as Id<"room_member">, {
      lastAt: Date.now(),
      currentUserSubject: nextUserSubject,
      randomNumber: random,
    });

    //将游戏记录写到新表里
    await ctx.db.insert("room_record", {
      ownerSubject: ownerSubject,
      randomNumber: random,
      currentUserSubject: identity.subject,
      nextUserSubject: nextUserSubject,
    });

    return true;
  },
});
