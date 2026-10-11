import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/post";
import { postPath, SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts()).filter((post) => !post.isDraft);
  return [
    ...["/", "/resume", "/articles", "/thoughts"].map((pathname) => ({
      url: new URL(pathname, SITE_URL).href,
      // Omit lastmod when the actual modification date is unknown.
    })),
    ...posts.map((post) => ({
      url: new URL(postPath(post), SITE_URL).href,
      lastModified: post.modifiedAt,
    })),
  ];
}
