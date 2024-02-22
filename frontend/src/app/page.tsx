"use client";
import PageWrap from "@/layout/base/PageWrap";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function Home(props: {}) {
  const [reloadAt, setReloadAt] = useState(0);

  return <PageWrap className="">Hello</PageWrap>;
}
