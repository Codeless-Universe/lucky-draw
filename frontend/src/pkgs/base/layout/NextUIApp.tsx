"use client";

import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Header from "./base/Header";
import RenderOnlyClient from "./RenderOnlyClient";
import Footer from "./base/Footer";
import { i18nScope } from "@/languages";
import { VoerkaI18nProvider } from "@voerkai18n/react";
import { ThemeDarkHelper, ThemeDarkStore } from "./theme/ThemeDarkHelper";

export function NextUIApp(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const router = useRouter();

  const { mode } = ThemeDarkStore;

  React.useEffect(() => {
    ThemeDarkHelper.init();
  }, []);

  // 2. Wrap NextUIProvider at the root of your app
  return (
    <body className={["min-h-screen bg-background text-foreground", mode].join(" ")}>
      <RenderOnlyClient>
        <NextUIProvider navigate={router.push}>
          <VoerkaI18nProvider scope={i18nScope} fallback={<div title="error I18n"></div>}>
            <Header></Header>
            {props.children && props.children}
            <Footer />
          </VoerkaI18nProvider>
        </NextUIProvider>
      </RenderOnlyClient>
    </body>
  );
}
