import type { Metadata } from "next";
import "./globals.css";
import "animate.css";

import { NextUIApp } from "@/layout/NextUIApp";
import ConvexClientProvider from "@/convex/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Lucky draw - codeless universe ",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextUIApp>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </NextUIApp>
    </html>
  );
}
