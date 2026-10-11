import type { Post } from "./post";
import {
  postMetadata,
  postPath,
  postStructuredData,
  serializeJsonLd,
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
  const data = JSON.parse(serializeJsonLd(postStructuredData(post)));
  expect(data).not.toHaveProperty("datePublished");
  expect(data.dateModified).toBe("2025-01-03T00:00:00.000Z");
  const createdAt = new Date("2024-01-01T00:00:00Z");
  expect(postStructuredData({ ...post, createdAt }).datePublished).toBe(
    createdAt.toISOString(),
  );
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
  expect(JSON.parse(serialized).headline).toBe(title);
});
