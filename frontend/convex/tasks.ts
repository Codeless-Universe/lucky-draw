import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("tasks", {
      text: "z_" + args.text,
      jsonValue: {
        name: "abc",
        age: 33,
        // createdAt: new Date(),
      },
    });
    return { id: newTaskId };
  },
});
