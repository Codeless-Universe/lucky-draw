"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@nextui-org/react";

export default function ConvexDemo() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.createTask);
  const initData = useMutation(api.wheel.initData);

  return (
    <div>
      <div className="flex flex-col gap-4">{tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}</div>
      <Button
        onPress={async () => {
          let res = await createTask({ text: Date.now() + "" });
          await initData({ text: Date.now() + "" });
          console.log("result", res.id);
        }}
      >
        Add
      </Button>
    </div>
  );
}
