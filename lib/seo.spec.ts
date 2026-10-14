import type { Post } from "./post";
import {
  postMetadata,
  postPath,
  postStructuredData,
  serializeJsonLd,
  PERSON_ID,
  WEBSITE_ID,
} from "./seo";

const post: Post = {
  slug: "한글 제목",
  tag: "etc",
  title: "글 제목",
  description: "설명",
  modifiedAt: new Date("2025-01-03T00:00:00Z"),
  content: "",
  readingMinutes: 1,
};

test("canonical routes encode slugs and respect the article section", () => {
  expect(postPath(post)).toBe(`/thoughts/${encodeURIComponent(post.slug)}`);
  expect(postPath({ ...post, tag: "articles" })).toBe(
    `/articles/${encodeURIComponent(post.slug)}`,
  );
});

test("an unknown publication date is omitted instead of fabricated", () => {
  const data = JSON.parse(serializeJsonLd(postStructuredData(post)))[
    "@graph"
  ][0];
  expect(data).not.toHaveProperty("datePublished");
  expect(data.dateModified).toBe("2025-01-03T00:00:00+09:00");
  const createdAt = new Date("2024-01-01T00:00:00Z");
  expect(
    JSON.parse(serializeJsonLd(postStructuredData({ ...post, createdAt })))[
      "@graph"
    ][0].datePublished,
  ).toBe("2024-01-01T00:00:00+09:00");
});

test("draft metadata blocks indexing", () => {
  expect(postMetadata({ ...post, isDraft: true }).robots).toEqual({
    index: false,
    follow: false,
  });
});

test("JSON-LD cannot close its script element", () => {
  const title = "</script><script>alert('unsafe')</script>";
  const serialized = serializeJsonLd(postStructuredData({ ...post, title }));
  expect(serialized).not.toContain("<");
  expect(JSON.parse(serialized)["@graph"][0].headline).toBe(title);
});

test("article entities resolve to the same author, publisher and website", () => {
  const graph = postStructuredData(post)["@graph"];
  expect(graph[0]).toMatchObject({
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    image: ["https://junukim.me/opengraph-image"],
  });
  expect(graph[1]).toMatchObject({ "@id": PERSON_ID, "@type": "Person" });
  expect(graph[2]).toMatchObject({ "@id": WEBSITE_ID, "@type": "WebSite" });
});
