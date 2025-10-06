import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { PostBody } from "@/components/post/MdxReader";
import { formatDate } from "@/lib/date";
import { getPost, getPosts } from "@/lib/post";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => post.tag !== "articles");
  return filteredPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.description,
    keywords: [post.tag],
  };
}

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
