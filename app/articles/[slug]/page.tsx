import { PageHeader } from "@/components/layout/PageHeader";
import { PostBody } from "@/components/post/MdxReader";
import { formatDate } from "@/lib/date";
import { getPost } from "@/lib/post";
import type { Metadata } from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Articles | junukim.dev",
};

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const { params } = props;

  const slug = (await params).slug;
  const post = await getPost(slug);

  return (
    <div className="w-full flex flex-col justify-center" style={{ gap: 28 }}>
      <PageHeader title={post.title} description={post.description}>
        <PageHeader.Text size="small">
          {formatDate(post.modifiedAt, "yyyy년 MM월 dd일")}
          &nbsp;&nbsp;|&nbsp;&nbsp; Read time: {post.readingMinutes}분
        </PageHeader.Text>
      </PageHeader>
      <PostBody content={post.content} />
    </div>
  );
}
