import { ConfettiHelper } from "@/helper/ConfettiHelper";
import "./spinwheel.css";
import { useEffect, useRef, useState } from "react";
import { Wheel } from "spin-wheel";

export default function SpinWheelWrap() {
  const dom = useRef<HTMLDivElement | null>(null);
  const [wheel, setWheel] = useState<any>();

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
      // overlayImage: "https://crazytim.github.io/spin-wheel/examples/themes/img/example-0-image.svg",
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

    const wheel = new Wheel(d, props);
    window.wheel = wheel;
    setWheel(wheel);

    wheel.onCurrentIndexChange = (e: any) => {
      // console.log(e);
    };
    wheel.onRest = (e: any) => {
      console.log(e);
      ConfettiHelper.showConfetti(d);
    };
  }, []);
  return (
    <div className="">
      <div ref={dom} className="relative aspect-square">
        <div
          className="turntable-btn cursor-pointer select-none"
          onClick={() => {
            wheel.spinToItem(0, 4000, true, 8);
          }}
        >
          Start
        </div>
      </div>
    </div>
  );
}
