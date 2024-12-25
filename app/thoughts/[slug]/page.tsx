import { PageHeader } from "@/components/layout/PageHeader";
import { PostBody } from "@/components/post/MdxReader";
import { getPost } from "@/lib/post";
import type { Metadata } from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Thoughts | junukim.dev",
};

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const { params } = props;

  const slug = (await params).slug;
  const post = await getPost(slug);

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
      <PageHeader title={post.title} description={post.description}>
        <PageHeader.Text size="small">
          Read time: {post.readingMinutes}분
        </PageHeader.Text>
      </PageHeader>
      <PostBody content={post.content} />
    </div>
  );
}
