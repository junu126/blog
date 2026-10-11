import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";

const RESUME_DOCUMENT_ID = "18dwelYksXn_q3yHzgsPSCV1o0nXR9x02FtgKOXYti78";
const RESUME_PREVIEW_URL = `https://docs.google.com/document/d/${RESUME_DOCUMENT_ID}/preview`;
const RESUME_URL = `https://docs.google.com/document/d/${RESUME_DOCUMENT_ID}/edit?usp=sharing`;

export const metadata: Metadata = pageMetadata(
  "Resume",
  "개발자 김준우의 이력서입니다.",
  "/resume",
);

export default function Resume() {
  return (
    <div
      data-page="resume"
      className="min-h-0 w-full flex-1 overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
      }}
    >
      <section className="flex min-h-0 w-full flex-1 flex-col gap-3">
        <h1 className="sr-only">김준우 이력서</h1>
        <div className="flex justify-end">
          <a
            className="inline-flex min-h-11 items-center text-sm text-blue-800 underline underline-offset-4"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            새 탭에서 이력서 열기
          </a>
        </div>
        <iframe
          className="min-h-0 w-full flex-1 border border-solid border-gray-200 bg-white"
          src={RESUME_PREVIEW_URL}
          title="개발자 김준우 이력서"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </section>
    </div>
  );
}
