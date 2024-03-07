"use client";
import { useRouterHelper } from "@/pkgs/base/helper/useRouterHelper";
import PageWrap from "@/pkgs/base/layout/base/PageWrap";
import { useState } from "react";
import WheelCardList from "../WheelCardList";

export default function Home(props: {}) {
  const [reloadAt, setReloadAt] = useState(0);
  const routerHeper = useRouterHelper({});

  return (
    <PageWrap className="">
      <div>
        <WheelCardList
          catalog="offline"
          onItemPress={(id) => {
            routerHeper.router.push(`/online/wheel?id=${id}`);
          }}
        />
      </div>
    </PageWrap>
  );
}
