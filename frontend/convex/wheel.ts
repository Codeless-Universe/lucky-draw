import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("wheel").collect();
  },
});

export const getById = query({
  args: { id: v.id("wheel") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const initData = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const splitStr = (str: string) => {
      let retArray: string[] = [];
      str.split("\n").forEach((item) => {
        item = item.trim();
        if (item) {
          retArray.push(item);
        }
      });
      return retArray;
    };

    const newTaskId = await ctx.db.insert("wheel", {
      title: "What to eat?",
      catalog: "one",
      language: "en",
      wheels: [
        {
          title: "Food",
          items: splitStr(`Chicken 🍗
          Hamburger 🍔🍟
          Mexican food 🌯🌮
          Sandwich 🥪
          Pizza 🍕
          Japanese food 🍱🍣
          Italian food 🍝
          Chinese food 🥡🍚
          Indian food 🍛
          Soup 🍜
          Hot Dog 🌭
          Flatbread 🥙
          Steak 🥩
          Salad 🥗`),
        },
        {
          title: "Type",
          items: splitStr(`Eat in
          Take out`),
        },
      ],
    });

    await ctx.db.insert("wheel", {
      title: "Bored",
      catalog: "one",
      language: "en",
      wheels: [
        {
          title: "",
          items: splitStr(`Pick some weeds
          Play Wordle
          Turn around 10 times
          Watch a movie
          Eat chocolate
          Spell your whole name backwards`),
        },
      ],
    });
    return { id: newTaskId };
  },
});
