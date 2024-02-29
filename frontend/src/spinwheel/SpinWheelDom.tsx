import { ConfettiHelper } from "@/helper/ConfettiHelper";
import "./spinwheel.css";
import { useEffect, useRef, useState } from "react";
import { Wheel } from "spin-wheel";

export type TProps_SpinWheelDom = {
  labels: string[];
  colors?: string[];
};

export default function SpinWheelDom(props: TProps_SpinWheelDom) {
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

    let labels = [...props.labels];
    if (labels.length <= 2) {
      labels = [...props.labels, ...props.labels];
    }

    let colors: typeof props.colors = [];
    if (props.colors) {
      colors = [...props.colors];
    }
    if (colors.length == 0) {
      colors = ["#ffc93c", "#66bfbf", "#a2d5f2", "#515070", "#43658b", "#ed6663", "#d54062"];
    }
    while (colors.length < labels.length) {
      colors = [...colors, ...colors];
    }

    const wheelParam = {
      // overlayImage: "https://crazytim.github.io/spin-wheel/examples/themes/img/example-0-image.svg",
      itemBackgroundColors: colors,
      itemLabelFontSizeMax: 40,
      items: (() => {
        let retArray: {
          label: string;
        }[] = [];
        labels.forEach((label) => {
          retArray.push({
            label: label,
          });
        });
        return retArray;
      })(),
    };

    const wheel = new Wheel(d, wheelParam);
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
