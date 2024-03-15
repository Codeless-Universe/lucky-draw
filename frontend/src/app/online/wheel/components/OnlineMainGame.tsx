"use client";
import { useRouterHelper } from "@/pkgs/base/helper/useRouterHelper";
import PageWrap from "@/pkgs/base/layout/base/PageWrap";
import SpinWheelWrap from "@/pkgs/spinwheel/SpinWheelWrap";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Button, Card, CardBody, Listbox, ListboxItem, Tab, Tabs, User } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "react-toastify";
import OnlineMain_Players from "./OnlineMain_Players";
import SpinWheelDom from "@/pkgs/spinwheel/SpinWheelDom";

export default function OnlineMainGame(props: {}) {
  const { param, replace } = useRouterHelper({ id: "", roomId: "" });

  // 查询
  const res = useQuery(api.room.getById, { id: param.roomId as Id<"room"> });
  const play = useMutation(api.room.play);

  if (!res) {
    return <div>loading</div>;
  }
  console.log("xxxxxxxxxx", res);

  return (
    <div className="">
      <div className="relative">
        <div className="absolute">
          <div>
            <div className="mb-1 text-tiny text-default-600">Now Player</div>
            <User
              name="Jane Doe"
              avatarProps={{
                name: "Jan",
                size: "sm",
              }}
            />
          </div>
        </div>
        <SpinWheelDom
          labels={res.wheel.wheels[0].items}
          displayResult={{
            random: res.room.randomNumber,
            lastAt: res.room.lastAt,
          }}
          onTap={async () => {
            const res = await play({
              roomId: param.roomId as Id<"room">,
            });
            if (res.code != 0) {
              toast.error(res.msg);
            }
          }}
        ></SpinWheelDom>
      </div>

      <Tabs aria-label="Options" className="mt-6">
        <Tab key="photos" title="Players">
          <Card>
            <CardBody>{res.room ? <OnlineMain_Players room={res.room} /> : <></>}</CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Records">
          <Card>
            <CardBody>
              <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                <ListboxItem key="new" description="Result1 | restul2">
                  Play1
                </ListboxItem>
                <ListboxItem key="new" description="Result1 | restul2">
                  Play2
                </ListboxItem>
              </Listbox>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
