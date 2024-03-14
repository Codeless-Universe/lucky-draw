"use client";
import { useRouterHelper } from "@/pkgs/base/helper/useRouterHelper";
import PageWrap from "@/pkgs/base/layout/base/PageWrap";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import OnlineMain from "./components/OnlineMain";

export default function Home(props: {}) {
  return (
    <PageWrap className="">
      <OnlineMain />
    </PageWrap>
  );
}
