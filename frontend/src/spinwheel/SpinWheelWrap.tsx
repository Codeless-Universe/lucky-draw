import { useEffect, useRef } from "react";
import { Wheel } from "spin-wheel";

export default function SpinWheelWrap() {
  const dom = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const props = {
      itemBackgroundColors: ["#ffc93c", "#66bfbf", "#a2d5f2", "#515070", "#43658b", "#ed6663", "#d54062"],
      items: [
        {
          label: "one",
        },
        {
          label: "two",
        },
        {
          label: "three",
        },
      ],
    };

    const wheel = new Wheel(dom.current, props);
  }, []);
  return <div ref={dom}></div>;
}
