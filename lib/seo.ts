import type { Metadata } from "next";

import type { Post } from "./post";
import { postDateTime } from "./date";

export const SITE_URL = "https://junukim.me";
export const SITE_DESCRIPTION =
  "프론트엔드 개발자 김준우의 블로그. 제품을 만드는 경험, 개발하며 배운 것, 일상에서 떠오른 생각을 기록합니다.";
export const AUTHOR = { name: "김준우", url: SITE_URL };
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  ...AUTHOR,
  alternateName: "Junwoo Kim",
  jobTitle: "프론트엔드 개발자",
  sameAs: [
    "https://www.linkedin.com/in/%EC%A4%80%EC%9A%B0-%EA%B9%80-740320163/",
  ],
};
const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "junukim.me",
  inLanguage: "ko-KR",
  publisher: { "@id": PERSON_ID },
};

export function websiteStructuredData() {
  return { "@context": "https://schema.org", "@graph": [WEBSITE, PERSON] };
}

export function profileStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/resume#page`,
        url: `${SITE_URL}/resume`,
        name: "김준우 이력서",
        inLanguage: "ko-KR",
        mainEntity: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      PERSON,
      WEBSITE,
    ],
  };
}

export function postPath(post: Pick<Post, "tag" | "slug">) {
  return `/${post.tag === "articles" ? "articles" : "thoughts"}/${encodeURIComponent(post.slug)}`;
}

export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: "junukim.me",
      title,
      description,
      url: pathname,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export function postMetadata(post: Post): Metadata {
  const metadata = pageMetadata(post.title, post.description, postPath(post));
  return {
    ...metadata,
    authors: [AUTHOR],
    robots: post.isDraft ? { index: false, follow: false } : undefined,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      // Missing publication dates are unknown, rather than modification dates.
      publishedTime: post.createdAt ? postDateTime(post.createdAt) : undefined,
      modifiedTime: postDateTime(post.modifiedAt),
      authors: [AUTHOR.name],
    },
  };
}

export function postStructuredData(post: Post) {
  const url = new URL(postPath(post), SITE_URL).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: post.title,
        description: post.description,
        inLanguage: "ko-KR",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        image: [`${SITE_URL}/opengraph-image`],
        datePublished: post.createdAt
          ? postDateTime(post.createdAt)
          : undefined,
        dateModified: postDateTime(post.modifiedAt),
      },
      PERSON,
      WEBSITE,
    ],
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
