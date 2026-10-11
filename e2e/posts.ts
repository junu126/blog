import fs from "node:fs";
import path from "node:path";

import { globSync } from "glob";
import matter from "gray-matter";

export const posts = globSync("data/**/*.mdx").flatMap((file) => {
  const { data } = matter(fs.readFileSync(file, "utf8"));
  if (data.isDraft === true) {
    return [];
  }
  const section =
    path.basename(path.dirname(file)) === "articles" ? "articles" : "thoughts";
  return [
    {
      path: `/${section}/${encodeURIComponent(data.slug)}`,
      title: data.title as string,
      description: data.description as string,
      modifiedAt: (data.modifiedAt as Date).toISOString(),
      createdAt: (data.createdAt as Date | undefined)?.toISOString(),
    },
  ];
});

export const pages = [
  "/",
  "/articles",
  "/thoughts",
  "/resume",
  ...posts.map((post) => post.path),
];
