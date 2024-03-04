import { ConfettiHelper } from "@/helper/ConfettiHelper";
import "./spinwheel.css";
import { useEffect, useRef, useState } from "react";
import { Wheel } from "spin-wheel";

export type TProps_SpinWheelDom = {
  labels: string[];
  centerText?: string;
  colors?: string[];
};

export default function SpinWheelDom({ centerText = "Tap", ...props }: TProps_SpinWheelDom) {
  const dom = useRef<HTMLDivElement | null>(null);
  const [wheel, setWheel] = useState<any>();
  const [countDown, setCouneDown] = useState(0);

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
      let maxCount = 8;
      if (item.length < maxCount) {
        return item;
      }
      return item.substring(0, maxCount);
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
      itemLabelFontSizeMax: 40,
      itemLabelRadius: 0.92,
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
    <div className="flex aspect-square max-h-[600px] w-full items-center justify-center">
      <div ref={dom} className="relative h-full w-full">
        <div
          className="turntable-btn cursor-pointer select-none"
          onClick={() => {
            if (countDown > 0) {
              return;
            }

            let temp = 3;
            let toIndex = Math.floor(Math.random() * props.labels.length);
            wheel.spinToItem(toIndex, temp * 1000, true, 8);
            let func = () => {
              temp = temp - 0.1;
              if (temp < 0) {
                temp = 0;
              }
              setCouneDown(temp);
              if (temp > 0) {
                setTimeout(() => {
                  func();
                }, 100);
              }
            };
            func();
          }}
        >
          {countDown == 0 ? centerText : countDown.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
