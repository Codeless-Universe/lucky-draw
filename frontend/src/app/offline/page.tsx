"use client";
import { useState } from "react";
import WheelCardList from "../WheelCardList";
import PageWrap from "@/pkgs/base/layout/base/PageWrap";

export default function Home(props: {}) {
  const [reloadAt, setReloadAt] = useState(0);

  return (
    <PageWrap className="">
      <div>
        <WheelCardList catalog="offline" />
      </div>
    </PageWrap>
  );
}
