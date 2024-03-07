"use client";

import { useEffect } from "react";
import { ThemeDarkHelper, ThemeDarkStore } from "./ThemeDarkHelper";

// 初始化主题
export default function ThemeInit() {
  const { mode } = ThemeDarkStore;

  useEffect(() => {
    ThemeDarkHelper.init();
  }, []);

  useEffect(() => {
    document.body.classList.value = ["text-foreground bg-background min-h-[100vh]", mode].join(" ");
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  // 输出以下隐藏 div，目的是为了 tailwind 确保生成引用 css
  return <div className="hidden min-h-[100vh] bg-background text-foreground"></div>;
}
