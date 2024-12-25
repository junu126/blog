import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { sync } from "glob";
import { isValid as isValidDate } from "date-fns/isValid";

import { formatDate } from "./date";

const BASE_PATH = "/data";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

export interface Post extends PostMatter {
  tag: string;
  content: string;
  readingMinutes: number;
}

interface PostMatter {
  slug: string;
  title: string;
  modifiedAt: Date;
  description: string;
}

export function getPostPaths() {
  return sync(`${POSTS_PATH}/**/**/*.mdx`);
}

export async function getPosts() {
  const posts = await Promise.all(getPostPaths().map(parsePost));
  return posts.sort(() => 1);
}

export function getPost(postPath: string) {
  return parsePost(postPath);
}

export async function parsePost(postPath: string): Promise<Post> {
  const post = fs.readFileSync(postPath, "utf8");
  const { data: postMatter, content } = matter(post);
  const tag = postPath.split("/").slice(-2, -1)[0];

  if (tag === undefined) {
    throw new Error(`Not found tag: ${tag}`);
  }

  if (!isPostMatter(postMatter)) {
    throw new Error(`Invalid post matter: ${postPath}`);
  }

  return {
    ...postMatter,
    tag,
    content,
    readingMinutes: Math.ceil(readingTime(content).minutes),
  };
}

function isPostMatter(data: unknown): data is PostMatter {
  return (
    typeof data === "object" &&
    data !== null &&
    "slug" in data &&
    "title" in data &&
    "modifiedAt" in data &&
    "description" in data &&
    typeof data.slug === "string" &&
    typeof data.title === "string" &&
    isValidDate(data.modifiedAt) &&
    typeof data.description === "string"
  );
}
