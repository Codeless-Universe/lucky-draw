"use client";
import { useRouterHelper } from "@/pkgs/base/helper/useRouterHelper";
import PageWrap from "@/pkgs/base/layout/base/PageWrap";
import SpinWheelWrap from "@/pkgs/spinwheel/SpinWheelWrap";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function Home(props: {}) {
  const { param } = useRouterHelper({ id: "" });
  const wheel = useQuery(api.wheel.getById, { id: param.id as Id<"wheel"> });
  if (!wheel) {
    return <div>loading</div>;
  }

  return (
    <PageWrap className="">
      <div>
        <SpinWheelWrap labels={wheel.wheels[0].items}></SpinWheelWrap>
      </div>
    </PageWrap>
  );
}
