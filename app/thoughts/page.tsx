import { PageHeader } from "@/components/layout/PageHeader";
import { PostList } from "@/components/ui/PostList";
import { getPosts } from "@/lib/post";
import type { Metadata } from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Thoughts | junukim.dev",
};

export default async function Thoughts() {
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => post.tag !== "articles");
  const sortedPosts = filteredPosts.sort((a, b) => {
    return b.modifiedAt.getTime() - a.modifiedAt.getTime();
  });

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
        {sortedPosts.map((post) => (
          <PostList.Item key={post.slug} post={post} />
        ))}
      </PostList>
    </div>
  );
}
