import type { Metadata } from "next";
import "./globals.css";
import "animate.css";

import { NextUIApp } from "@/layout/NextUIApp";
import ConvexClientProvider from "@/convex/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Solidity visualization - codeless universe ",
  description: "Children can also understand contract codes solidity",
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
