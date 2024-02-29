import { useEffect, useRef } from "react";
import { Wheel } from "spin-wheel";

export default function SpinWheelWrap() {
  const dom = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let d = dom.current;
    if (!d) {
      return;
    }
    // @ts-ignore
    if (d.inited) {
      return;
    }
    // @ts-ignore
    d.inited = true;

    const props = {
      overlayImage: "https://crazytim.github.io/spin-wheel/examples/themes/img/example-0-image.svg",
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
    console.log("zzzzzzzzzzzzzzz");

    const wheel = new Wheel(d, props);

    window.wheel = wheel;
    wheel.onCurrentIndexChange = (e) => {
      console.log(e);
    };
  }, []);
  return <div ref={dom} className="h-[300px]"></div>;
}
