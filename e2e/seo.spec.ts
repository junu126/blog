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
    const graph = JSON.parse(json!)["@graph"];
    const data = graph.find(
      (entity: { "@type": string }) => entity["@type"] === "BlogPosting",
    );
    expect(data).toMatchObject({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://junukim.me${post.path}`,
      dateModified: post.modifiedAt,
      author: { "@id": "https://junukim.me/#person" },
      publisher: { "@id": "https://junukim.me/#person" },
      image: ["https://junukim.me/opengraph-image"],
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
  expect((xml.match(/<lastmod>/g) ?? []).length).toBe(posts.length + 3);
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
  "/nope",
  "/articles/jeju",
  "/thoughts/fcc",
  "/articles/does-not-exist",
  "/thoughts/does-not-exist",
]) {
  test(`${pathname}: 404 and noindex`, async ({ request }) => {
    const response = await request.get(pathname);
    expect(response.status()).toBe(404);
    const html = await response.text();
    expect(html).toContain('name="robots" content="noindex"');
    expect(html).not.toContain('rel="canonical"');
    expect(html).toContain("페이지를 찾을 수 없어요 | junukim.me</title>");
    expect(html).not.toContain('property="og:url"');
  });
}

test("home and resume expose their own entities and readable content", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("김준우 | 프론트엔드 개발자 블로그");
  const home = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(
    JSON.parse(home!)["@graph"].map(
      (entity: { "@type": string }) => entity["@type"],
    ),
  ).toEqual(["WebSite", "Person"]);
  await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(1);
  await expect(page.locator("nav li[tabindex]")).toHaveCount(0);
  await page.goto("/resume");
  expect(
    (await page.locator("main article").innerText()).length,
  ).toBeGreaterThanOrEqual(500);
  const resume = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(JSON.parse(resume!)["@graph"][0]["@type"]).toBe("ProfilePage");
});

test("security headers and immutable font caching", async ({ request }) => {
  const response = await request.get("/");
  expect(response.headers()).toMatchObject({
    "x-content-type-options": "nosniff",
    "x-frame-options": "SAMEORIGIN",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
  });
  const font = await request.get(
    "/fonts/pretendard-v1.3.9/PretendardVariable.subset.91.woff2",
  );
  expect(font.headers()["cache-control"]).toBe(
    "public, max-age=31536000, immutable",
  );
});
