"use client";

import resso from "resso";

export type TThemeDarkMode = "dark" | "light" | "auto";

export const ThemeDarkStore = resso({
  mode: "" as TThemeDarkMode,
});

export const ThemeDarkHelper = {
  setTheme: (theme: TThemeDarkMode) => {
    ThemeDarkStore.mode = theme;
    localStorage.setItem("darkMode", theme);
  },
  init: () => {
    if (ThemeDarkStore.mode) {
      return;
    }
    let retVal = window.localStorage.getItem("darkMode");
    if (!retVal) {
      retVal = "light";
    }
    // @ts-ignore
    ThemeDarkStore.mode = retVal;
  },
};
