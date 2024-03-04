"use client";
import ConvexDemo from "@/convex/ConvexDemo";
import PageWrap from "@/layout/base/PageWrap";
import SpinWheelDemo from "@/spinwheel/SpinWheelDemo";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import WheelCardList from "./WheelCardList";
import LoginButton from "@/convex/Auth0LoginButton";

export default function Home(props: {}) {
  const [reloadAt, setReloadAt] = useState(0);

  return (
    <PageWrap className="">
      <div>
        <LoginButton />
        <WheelCardList />
        {/* <SpinWheelDemo/>
        <ConvexDemo /> */}
      </div>
    </PageWrap>
  );
}
