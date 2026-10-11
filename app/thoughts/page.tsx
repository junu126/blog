import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { PostList } from "@/components/post/PostList";
import { getPosts } from "@/lib/post";

export const metadata: Metadata = pageMetadata(
  "Thoughts",
  "일과 삶, 여행과 책에서 발견한 생각과 경험을 기록합니다.",
  "/thoughts",
);

const posts = await getPosts();
const filteredPosts = posts.filter((post) => post.tag !== "articles");

export default function Thoughts() {
  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 28,
      }}
    >
      <PageHeader title="Thoughts" description="이것 저것을 기록합니다." />
      <PostList>
        {filteredPosts.map((post) => (
          <PostList.Item key={post.slug} post={post} />
        ))}
      </PostList>
    </div>
  );
}
