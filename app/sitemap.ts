import { MetadataRoute } from "next";

const ROOT_SITE_MAP: MetadataRoute.Sitemap[number] = {
  url: "https://junukim.dev",
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 0.5,
};

const CV_SITE_MAP: MetadataRoute.Sitemap[number] = {
  url: "https://junukim.dev/cv",
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 1,
};

const ARTICLE_SITE_MAP: MetadataRoute.Sitemap[number] = {
  url: "https://junukim.dev/articles",
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 0.8,
};

const ETC_SITE_MAP: MetadataRoute.Sitemap[number] = {
  url: "https://junukim.dev/etc",
  lastModified: new Date(),
  changeFrequency: "daily",
  priority: 0.5,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const articleSiteMap: MetadataRoute.Sitemap = [].map(() => ({
    ...ARTICLE_SITE_MAP,
    url: `https://junukim.dev/articles/${0}`, // FIXME: url 포함시키기
    lastModified: new Date(), // FIXME: 포스팅 날짜 포함시키기
  }));

  const etcSiteMap: MetadataRoute.Sitemap = [].map(() => ({
    ...ETC_SITE_MAP,
    url: `https://junukim.dev/etc/${0}`, // FIXME: url 포함시키기
    lastModified: new Date(), // FIXME: 포스팅 날짜 포함시키기
  }));

  return [
    ROOT_SITE_MAP,
    CV_SITE_MAP,
    ARTICLE_SITE_MAP,
    ...articleSiteMap,
    ETC_SITE_MAP,
    ...etcSiteMap,
  ];
}
