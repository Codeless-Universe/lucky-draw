import "./spinwheel.css";
import { useEffect, useRef, useState } from "react";
import { Wheel } from "spin-wheel";
import { ConfettiHelper } from "../base/helper/ConfettiHelper";

export type TProps_SpinWheelDom = {
  labels: string[];
  centerText?: string;
  colors?: string[];
  onTap?: () => void;
  displayResult?: {
    random: number;
    lastAt: number;
  };
};

export default function SpinWheelDom({ centerText = "Tap", ...props }: TProps_SpinWheelDom) {
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
    labels = labels.map((item) => {
      let maxCount = 18;
      if (item.length < maxCount) {
        return item;
      }
      return item.substring(0, maxCount - 3) + "...";
    });

    let colors: typeof props.colors = [];
    if (props.colors) {
      colors = [...props.colors];
    }
    if (colors.length == 0) {
      // colors = ["#ffc93c", "#66bfbf", "#a2d5f2", "#515070", "#43658b", "#ed6663", "#d54062"];
      colors = ["#fa8c16", "#faad14", "#a0d911", "#52c41a", "#13c2c2", "#1890ff", "#722ed1", "#eb2f96"];
    }
    while (colors.length < labels.length) {
      colors = [...colors, ...colors];
    }

    const wheelParam = {
      // overlayImage: "https://crazytim.github.io/spin-wheel/examples/themes/img/example-0-image.svg",
      itemBackgroundColors: colors,
      itemLabelFontSizeMax: 30,
      itemLabelRadius: 0.92,
      itemLabelAlign: "left",
      itemLabelRotation: 180,
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

  useEffect(() => {
    if (!props.displayResult) {
      return;
    }
    if (!wheel) {
      return;
    }

    if (props.displayResult.lastAt + 3000 < Date.now()) {
      return;
    }
    if (typeof props.displayResult.random != "number") {
      return;
    }

    let temp = 3;
    let toIndex = Math.floor(props.displayResult.random * props.labels.length);
    wheel.spinToItem(toIndex, temp * 1000, true, 8);
  }, [props.displayResult, wheel]);

  return (
    <div className="flex aspect-square max-h-[600px] w-full items-center justify-center">
      <div ref={dom} className="relative h-full w-full">
        <div
          className="turntable-btn cursor-pointer select-none"
          onClick={() => {
            if (props.onTap) {
              props.onTap();
              return;
            }
            let temp = 3;
            let toIndex = Math.floor(Math.random() * props.labels.length);
            wheel.spinToItem(toIndex, temp * 1000, true, 8);
          }}
        >
          {/* {countDown == 0 ? centerText : countDown.toFixed(1)} */}
          {centerText}
        </div>
      </div>
    </div>
  );
}
