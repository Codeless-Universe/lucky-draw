"use client";
import PageWrap from "@/layout/base/PageWrap";
import { useState } from "react";
import WheelCardList from "./WheelCardList";

export default function Home(props: {}) {
  const [reloadAt, setReloadAt] = useState(0);

  return (
    <PageWrap className="">
      <div>
        <WheelCardList />
        {/* <SpinWheelDemo/>
        <ConvexDemo /> */}
      </div>
    </PageWrap>
  );
}
