import type React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat, Lobster } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lobster = Lobster({
  subsets: ["latin"],
  variable: "--font-lobster",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Açaí do Fessão | Pedido Online",
  description:
    "Monte seu açaí do seu jeito e faça seu pedido online no Açaí do Fessão.",
  icons: {
    icon: "/icon-acai.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#47175b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${lobster.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
