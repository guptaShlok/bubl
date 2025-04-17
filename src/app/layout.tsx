import type { Metadata } from "next";

import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: [
    {
      path: "./fonts/Montserrat-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Bubl",
  description: "Bubl- now in India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
