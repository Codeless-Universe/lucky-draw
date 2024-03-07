"use client";

import { useEffect, useState } from "react";

export default function RenderOnlyClient(props: { children: JSX.Element | JSX.Element[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window == "undefined") {
      return;
    }
    setIsClient(true);
  }, []);

  if (!isClient) {
    //https://nextjs.org/docs/messages/react-hydration-error
    return <div></div>;
  }

  return <div>{props.children}</div>;
}
