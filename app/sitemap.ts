import { getPosts } from "@/lib/post";
import type { MetadataRoute } from "next";

const ROOT_SITE_MAP: MetadataRoute.Sitemap[number] = {
  url: "https://junukim.me",
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 0.5,
};

const RESUME_SITE_MAP: MetadataRoute.Sitemap[number] = {
  url: "https://junukim.me/resume",
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 1,
};

const ARTICLE_SITE_MAP: MetadataRoute.Sitemap[number] = {
  url: "https://junukim.me/articles",
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 0.8,
};

const THOUGHTS_SITE_MAP: MetadataRoute.Sitemap[number] = {
  url: "https://junukim.me/thoughts",
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 0.5,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const articleSiteMap: MetadataRoute.Sitemap = posts
    .filter((post) => post.tag === "articles")
    .map((post) => ({
      ...ARTICLE_SITE_MAP,
      url: `https://junukim.me/articles/${post.slug}`,
      lastModified: post.modifiedAt,
    }));

  const thoughtsSiteMap: MetadataRoute.Sitemap = posts
    .filter((post) => post.tag !== "articles")
    .map((post) => ({
      ...THOUGHTS_SITE_MAP,
      url: `https://junukim.me/thoughts/${post.slug}`,
      lastModified: post.modifiedAt,
    }));

  return [
    ROOT_SITE_MAP,
    RESUME_SITE_MAP,
    ARTICLE_SITE_MAP,
    ...articleSiteMap,
    THOUGHTS_SITE_MAP,
    ...thoughtsSiteMap,
  ];
}
