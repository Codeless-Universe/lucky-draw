"use client";

import { Button } from "@nextui-org/react";
import SVGWrap from "@/components/icon/SVGWrap";
import { ThemeDarkHelper, ThemeDarkStore } from "./ThemeDarkHelper";
import { useEffect } from "react";

export default function ThemeDarkSwitch() {
  const { mode } = ThemeDarkStore;

  useEffect(() => {
    ThemeDarkHelper.init();
  }, []);

  return (
    <Button
      isIconOnly
      className="text-xl"
      // color={mode == "light" ? "warning" : "default"}
      onClick={() => {
        let to: typeof mode = "light";
        if (mode == "light") {
          to = "dark";
        }
        ThemeDarkHelper.setTheme(to);
      }}
    >
      {(() => {
        if (mode == "light") {
          return <SVGWrap name="WeatherSunny16Regular" className="" />;
        }
        return <SVGWrap name="WeatherMoon16Regular" />;
      })()}
    </Button>
  );
}
