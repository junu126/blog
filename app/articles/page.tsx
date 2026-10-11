import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { PostList } from "@/components/post/PostList";
import { getPosts } from "@/lib/post";

export const metadata: Metadata = pageMetadata(
  "Articles",
  "프론트엔드 개발과 제품을 만들며 배운 지식, 구현 경험을 기록합니다.",
  "/articles",
);

const posts = await getPosts();
const filteredPosts = posts.filter((post) => post.tag === "articles");

export default function Articles() {
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
      <PageHeader
        title="Articles"
        description="유용한 지식, 인사이트를 기록합니다."
      />
      <PostList>
        {filteredPosts.map((post) => (
          <PostList.Item key={post.slug} post={post} />
        ))}
      </PostList>
    </div>
  );
}
