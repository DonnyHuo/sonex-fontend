import {
  KEY_WORDS_EN,
  KEY_WORDS_ZH,
  OPEN_GRAPH,
  SEO_LINKS,
  SITE,
  TWITTER,
} from "@/config/seo";
import { Metadata } from "next";

import Farm from "./components/Farm";

export const metadata: Metadata = {
  title: `Pool | ${SITE.title}`,
  description: SITE.description,
  keywords: [
    ...KEY_WORDS_EN.pool,
    ...KEY_WORDS_ZH.pool,
    ...SEO_LINKS.pool.map((item) => item.url),
  ],
  openGraph: OPEN_GRAPH,
  twitter: TWITTER,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Page() {
  return <Farm />;
}
