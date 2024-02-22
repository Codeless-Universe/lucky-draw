import type { Metadata } from "next";
import "./globals.css";
import "animate.css";

import { NextUIApp } from "@/layout/NextUIApp";

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
      <NextUIApp>{children}</NextUIApp>
    </html>
  );
}
