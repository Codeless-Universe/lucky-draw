import type { Metadata } from "next";
import "./globals.css";
import "animate.css";
import { NextUIApp } from "@/pkgs/base/layout/NextUIApp";
import ConvexClientProvider from "@/pkgs/convex/components/ConvexClientProvider";

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
      <ConvexClientProvider>
        <NextUIApp>{children}</NextUIApp>
      </ConvexClientProvider>
    </html>
  );
}
