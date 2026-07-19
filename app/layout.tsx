import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { NavHeaderPart, NavBodyPart } from "./components/Navbar/Navbar";
import LayoutShell from "./components/LayoutShell/LayoutShell";

const arialNarrow = localFont({
  src: "../public/fonts/arialnarrow.woff2",
  variable: "--font-arial-narrow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "stuutzer.com",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={arialNarrow.variable}>
      <body>
        <LayoutShell navHeader={<NavHeaderPart />} navBody={<NavBodyPart />}>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
