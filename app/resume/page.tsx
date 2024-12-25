import { PageHeader } from "@/components/layout/PageHeader";
import { PostList } from "@/components/post/PostList";
import { getPosts } from "@/lib/post";
import { Link } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "junukim resume",
};

export default async function Resume() {
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => post.tag !== "articles");

  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
      }}
    >
      <PageHeader title="안녕하세요." description="개발자 김준우 입니다." />
      <section>
        <Link
          fontSize={22}
          color="blue.500"
          href="https://docs.google.com/document/d/18dwelYksXn_q3yHzgsPSCV1o0nXR9x02FtgKOXYti78/edit?usp=sharing/"
          lineHeight="1em"
          isExternal
        >
          Enter the resume
        </Link>
      </section>
    </div>
  );
}
