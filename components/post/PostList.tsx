import type { ReactNode } from "react";
import Link from "next/link";

import type { Post } from "@/lib/post";
import { formatDate } from "@/lib/date";
import { postPath } from "@/lib/seo";
PostList.Item = PostListItem;
export function PostList({ children }: { children: ReactNode }) {
  return (
    <ul aria-label="글 목록" className="post-list">
      {children}
    </ul>
  );
}
function PostListItem({ post }: { post: Post }) {
  return (
    <li>
      <Link href={postPath(post)} className="post-list-link">
        <h2>{post.title}</h2>
        <time dateTime={post.modifiedAt.toISOString()}>
          {formatDate(post.modifiedAt, "yyyy. MM. dd")}
        </time>
      </Link>
    </li>
  );
}
