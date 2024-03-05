"use client";
import ButtonLoading from "@/components/feedback/ButtonLoading";
import { useRouterHelper } from "@/helper/useRouterHelper";
import PageWrap from "@/layout/base/PageWrap";
import SpinWheelWrap from "@/spinwheel/SpinWheelWrap";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Button, Card, CardBody, Tab, Tabs, User } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { resolve } from "path";
import { useState } from "react";

export default function Home(props: {}) {
  const { param } = useRouterHelper({ id: "" });
  const wheel = useQuery(api.wheel.getById, { id: param.id as Id<"wheel"> });
  if (!wheel) {
    return <div>loading</div>;
  }

  return (
    <PageWrap className="">
      <div className="grid grid-cols-2 gap-2">
        <SpinWheelWrap labels={["Player 1", "Player 2"]}></SpinWheelWrap>

        <SpinWheelWrap labels={wheel.wheels[0].items}></SpinWheelWrap>
      </div>
      <div className=" flex-rows flex items-center justify-center gap-2">
        <ButtonLoading
          onClick={async () => {
            await new Promise((resolve) => {
              setTimeout(resolve, 3000);
            });
          }}
        >
          Start
        </ButtonLoading>
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

              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Records">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </PageWrap>
  );
}
