"use client";
import ButtonLoading from "@/components/feedback/ButtonLoading";
import { useRouterHelper } from "@/helper/useRouterHelper";
import PageWrap from "@/layout/base/PageWrap";
import SpinWheelWrap from "@/spinwheel/SpinWheelWrap";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Button } from "@nextui-org/react";
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
        <SpinWheelWrap
          labels={["#fa8c16", "#faad14", "#a0d911", "#52c41a", "#13c2c2", "#1890ff", "#722ed1", "#eb2f96"]}
        ></SpinWheelWrap>

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
        <Button>In</Button>
      </div>
    </PageWrap>
  );
}
