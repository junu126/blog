import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { AUTHOR, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";
import { FontPreload } from "@/components/layout/FontPreload";

import "./globals.css";
import "./pretendard.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "김준우 | 프론트엔드 개발자 블로그",
    template: "%s | junukim.me",
  },
  description: SITE_DESCRIPTION,
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
      <body>
        <FontPreload />
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
