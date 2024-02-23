"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@nextui-org/react";

export default function ConvexDemo() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.createTask);

  return (
    <div>
      <div className="flex flex-col gap-4">{tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}</div>
      <Button
        onPress={() => {
          createTask({ text: Date.now() + "" });
        }}
      >
        Add
      </Button>
    </div>
  );
}
