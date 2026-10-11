import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { AUTHOR, pageMetadata, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";

import "./globals.css";
import "./pretendard.css";

export const metadata: Metadata = {
  ...pageMetadata("junukim.me", SITE_DESCRIPTION, "/"),
  metadataBase: new URL(SITE_URL),
  title: { default: "junukim.me", template: "%s | junukim.me" },
  authors: [AUTHOR],
  creator: AUTHOR.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preload"
          href="/fonts/pretendard-v1.3.9/PretendardVariable.subset.91.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content" tabIndex={0}>
          본문으로 건너뛰기
        </a>
        {children}
        {process.env.VERCEL === "1" && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}
      </body>
    </html>
  );
}
