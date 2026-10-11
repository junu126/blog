import type { Metadata } from "next";

import type { Post } from "./post";

export const SITE_URL = "https://junukim.me";
export const SITE_DESCRIPTION =
  "프론트엔드 개발자 김준우의 블로그. 제품을 만드는 경험, 개발하며 배운 것, 일상에서 떠오른 생각을 기록합니다.";
export const AUTHOR = { name: "김준우", url: SITE_URL };

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
      publishedTime: post.createdAt?.toISOString(),
      modifiedTime: post.modifiedAt.toISOString(),
      authors: [AUTHOR.name],
    },
  };
}

export function postStructuredData(post: Post) {
  const url = new URL(postPath(post), SITE_URL).href;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.description,
    inLanguage: "ko-KR",
    author: { "@type": "Person", ...AUTHOR },
    datePublished: post.createdAt?.toISOString(),
    dateModified: post.modifiedAt.toISOString(),
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
