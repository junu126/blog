import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/post";
import { postPath, SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts()).filter((post) => !post.isDraft);
  const latest = (items: typeof posts) =>
    items.length
      ? new Date(Math.max(...items.map((post) => post.modifiedAt.getTime())))
      : undefined;
  return [
    { url: `${SITE_URL}/`, lastModified: latest(posts) },
    // The resume document's original modification date is unknown.
    { url: `${SITE_URL}/resume` },
    {
      url: `${SITE_URL}/articles`,
      lastModified: latest(posts.filter((post) => post.tag === "articles")),
    },
    {
      url: `${SITE_URL}/thoughts`,
      lastModified: latest(posts.filter((post) => post.tag !== "articles")),
    },
    ...posts.map((post) => ({
      url: new URL(postPath(post), SITE_URL).href,
      lastModified: post.modifiedAt,
    })),
  ];
}
