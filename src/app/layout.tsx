import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

import MainNavbar from "@/shared/layout/MainNavbar";
import TopBar from "@/shared/layout/TopBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ShopNext",
  description: "Modern Ecommerce Platform",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopBar />       {/* ← pehle */}
          <MainNavbar />   {/* ← baad mein */}
          {children}
        </Providers>
      </body>
    </html>
  );
}