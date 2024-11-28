import {
  KEY_WORDS_EN,
  KEY_WORDS_ZH,
  OPEN_GRAPH,
  SEO_LINKS,
  SITE,
  TWITTER,
} from "@/config/seo";
import type { Metadata } from "next";
import localFont from "next/font/local";

import Header from "@/components/header";

import "../assets/css/globals.css";

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  keywords: [
    ...KEY_WORDS_EN.home,
    ...KEY_WORDS_ZH.home,
    ...SEO_LINKS.home.map((item) => item.url),
  ],
  openGraph: OPEN_GRAPH,
  twitter: TWITTER,
  icons: {
    icon: "/favicon.ico",
  },
};

import { Providers } from "./providers";

import ContextProvider from "./appkit";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#22242A] text-white`}
      >
        <ContextProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </ContextProvider>
      </body>
    </html>
  );
}
