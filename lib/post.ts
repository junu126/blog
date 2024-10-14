import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { sync } from "glob";
import { isValid as isValidDate } from "date-fns/isValid";

import { formatDate } from "./date";

const BASE_PATH = "/data";
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

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

export async function parsePost(postPath: string) {
  const post = fs.readFileSync(postPath, "utf8");
  const { data: postMatter, content } = matter(post);

  if (!isPostMatter(postMatter)) {
    throw new Error(`Invalid post matter: ${postPath}`);
  }

  return {
    ...postMatter,
    content,
    modifiedAt: formatDate(postMatter.modifiedAt, "yyyy년 MM월 dd일"),
    readingMinutes: Math.ceil(readingTime(content).minutes),
  };
}

interface PostMatter {
  title: string;
  modifiedAt: string;
  description: string;
}

function isPostMatter(data: { [key: string]: any }): data is PostMatter {
  return (
    typeof data.title === "string" &&
    isValidDate(data.modifiedAt) &&
    typeof data.description === "string"
  );
}
