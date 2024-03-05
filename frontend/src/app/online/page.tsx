"use client";
import PageWrap from "@/layout/base/PageWrap";
import { useState } from "react";
import WheelCardList from "../WheelCardList";
import { useRouterHelper } from "@/helper/useRouterHelper";

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
