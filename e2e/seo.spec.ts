import { expect, test } from "@playwright/test";
import { imageSize } from "image-size";

import { pages, posts } from "./posts";

for (const post of posts) {
  test(`${post.path}: server-rendered SEO`, async ({ request }) => {
    const response = await request.get(post.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    expect(title).toBe(`${post.title} | junukim.me`);
    expect(html).toContain(
      `rel="canonical" href="https://junukim.me${post.path}"`,
    );
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    const json = html.match(
      /<script type="application\/ld\+json">(.*?)<\/script>/,
    )?.[1];
    expect(json).toBeDefined();
    const data = JSON.parse(json!);
    expect(data).toMatchObject({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://junukim.me${post.path}`,
      dateModified: post.modifiedAt,
      author: { name: "김준우" },
    });
    expect(data.datePublished).toBe(post.createdAt);
    expect(html).not.toContain('name="robots" content="noindex');
  });
}

test("sitemap is exact, unique and stable", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  const urls = Array.from(
    xml.matchAll(/<loc>(.*?)<\/loc>/g),
    (match) => match[1],
  );
  expect(urls.sort()).toEqual(
    pages.map((pathname) => `https://junukim.me${pathname}`).sort(),
  );
  expect(new Set(urls).size).toBe(pages.length);
  expect((xml.match(/<lastmod>/g) ?? []).length).toBe(posts.length);
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(
    "Sitemap: https://junukim.me/sitemap.xml",
  );
});

test("social image is a successful 1200x630 PNG", async ({ request }) => {
  const response = await request.get("/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
  expect(imageSize(await response.body())).toMatchObject({
    width: 1200,
    height: 630,
  });
});

for (const pathname of [
  "/articles/jeju",
  "/thoughts/fcc",
  "/articles/does-not-exist",
  "/thoughts/does-not-exist",
]) {
  test(`${pathname}: 404 and noindex`, async ({ request }) => {
    const response = await request.get(pathname);
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain('name="robots" content="noindex"');
  });
}
