"use client";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export default function ConvexDemo() {
  const tasks = useQuery(api.tasks.get);
  return <main className="flex flex-col gap-4">{tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}</main>;
}
