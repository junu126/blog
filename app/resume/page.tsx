import type { Metadata } from "next";

import { JsonLd } from "@/lib/jsonld";
import { pageMetadata, profileStructuredData } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";

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
    <div data-page="resume" className="flex w-full flex-col gap-7">
      <JsonLd data={profileStructuredData()} />
      <PageHeader title="김준우 이력서" description="Web Product Engineer">
        <PageHeader.Text>
          제품을 만드는 프론트엔드 개발자 김준우입니다.
        </PageHeader.Text>
      </PageHeader>
      <article className="prose reading-body max-w-none">
        <h2>경력</h2>
        <h3>flex · Web Product Engineer</h3>
        <p>2020년 10월 ~ 2025년 5월 23일</p>
        <p>
          Pre A 투자 시기에 합류하여 주요 도메인 개발에 기여했습니다. 급여와
          연말정산, 캘린더와 승인, 전자계약과 채용, 평가와 인사이트 등 여러
          제품을 개발하고 운영했습니다.
        </p>
        <h3>급여 · 연말정산</h3>
        <p>2024년 2월 ~ 2025년 5월</p>
        <ul>
          <li>
            flex 급여관리 솔루션을 운영하고 세금 납부 관리 솔루션과 연말정산
            기능을 개발했습니다.
          </li>
          <li>클라이언트에서 Excel 파일을 생성하는 기능을 개발했습니다.</li>
        </ul>
        <h3>캘린더 · 승인 · 워크플로우</h3>
        <p>2023년 7월 ~ 2024년 2월</p>
        <ul>
          <li>
            업무 사이클 일정을 한눈에 확인할 수 있는 flex 캘린더를 개발했습니다.
          </li>
          <li>
            전자계약, 전자서명, 휴가 사용 등에 활용하는 공통 승인 모듈을
            개발하고 운영했습니다.
          </li>
          <li>
            문서 대량 다운로드를 처리하는 비동기 Node.js 서버를 개발했습니다.
          </li>
        </ul>
        <h3>Core · 전자계약 · 채용 · 평가 · 인사이트</h3>
        <p>2020년 10월 ~ 2023년 7월</p>
        <ul>
          <li>
            구성원 코어 데이터를 편리하게 추가하고 수정하는 테이블 편집기를
            개발했습니다.
          </li>
          <li>
            회사와 구성원의 회원가입 및 퇴사·회원탈퇴를 위한 온보딩과 오프보딩
            기능을 개발했습니다.
          </li>
          <li>
            전자계약서 작성을 위한 WYSIWYG 편집기와 계약서 출력을 위한 headless
            browser 기반 Node.js 서버를 개발했습니다.
          </li>
          <li>
            신규 구성원 채용 흐름을 관리하는 채용 제품, 다면 평가를 위한 360도
            리뷰와 목표 관리를 개발했습니다.
          </li>
          <li>
            디자인 시스템의 SVG 기반 차트 라이브러리 fx-chart와 데이터를 여러
            차트 모델로 변환하는 인사이트 제품을 개발했습니다.
          </li>
          <li>
            CI/CD와 연계하여 제품 국제화를 위한 다국어 처리(i18n)를
            구현했습니다.
          </li>
        </ul>
        <h2>기술</h2>
        <p>
          React, TypeScript, Node.js, Sentry, Micro Frontend, i18n, GitHub
          Actions를 사용했습니다. 제품 화면부터 문서 처리 서버와 배포 자동화까지
          개발 경험이 있습니다.
        </p>
        <h2>학력</h2>
        <p>
          대덕소프트웨어마이스터고등학교 소프트웨어 개발과 · 2018년 3월 ~ 2021년
          2월
        </p>
        <h2>자격</h2>
        <p>ICAgile Certified Professional · 2019년 7월</p>
      </article>
      <details className="w-full">
        <summary className="cursor-pointer py-3">
          Google Docs 이력서 원문 보기
        </summary>
        <div className="flex justify-end py-3">
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
          className="h-[70dvh] min-h-96 w-full border border-solid border-gray-200 bg-white"
          src={RESUME_PREVIEW_URL}
          title="개발자 김준우 이력서"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
        />
      </details>
    </div>
  );
}
