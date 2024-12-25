import { PageHeader } from "@/components/layout/PageHeader";
import { PostList } from "@/components/post/PostList";
import { getPosts } from "@/lib/post";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts | junukim.me",
};

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
