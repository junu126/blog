import { PageHeader } from "@/components/layout/PageHeader";
import { PostList } from "@/components/post/PostList";
import { getPosts } from "@/lib/post";
import type { Metadata } from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Articles | junukim.dev",
};

export default async function Articles() {
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => post.tag === "articles");

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
