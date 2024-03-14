"use client";
import { useRouterHelper } from "@/pkgs/base/helper/useRouterHelper";
import PageWrap from "@/pkgs/base/layout/base/PageWrap";
import SpinWheelWrap from "@/pkgs/spinwheel/SpinWheelWrap";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Button, Card, CardBody, Listbox, ListboxItem, Tab, Tabs, User } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { toast } from "react-toastify";

export default function OnlineMainGame(props: {}) {
  const { param } = useRouterHelper({ id: "" });
  const wheel = useQuery(api.wheel.getById, { id: param.id as Id<"wheel"> });
  if (!wheel) {
    return <div>loading</div>;
  }

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
        <SpinWheelWrap labels={wheel.wheels[0].items}></SpinWheelWrap>
      </div>

      <Tabs aria-label="Options" className="mt-6">
        <Tab key="photos" title="Players">
          <Card>
            <CardBody>
              <div className="flex flex-col items-start gap-2">
                <div>
                  <User
                    name="Jane Doe"
                    description="Product Designer"
                    avatarProps={{
                      name: "Jan",
                      size: "sm",
                    }}
                  />
                </div>

                <div>
                  <User
                    name="Jane Doe"
                    description="Product Designer"
                    avatarProps={{
                      name: "Jan",
                      size: "sm",
                    }}
                  />
                </div>

                <div>
                  <Button
                    onPress={() => {
                      toast("Wow so easy!");
                    }}
                  >
                    Invite friends
                  </Button>
                </div>
              </div>
            </CardBody>
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