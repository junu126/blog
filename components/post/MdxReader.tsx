// @ts-expect-error no types
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { trustedMdxPolicy } from "./mdx-policy";
import { A, Callout, Image, ImageWithText } from "./mdx-ui";
import { PostTableOfContents } from "./PostTableOfContents";

interface Props {
  content: string;
}

const trustedMdxOptions: NonNullable<MDXRemoteProps["options"]> = {
  ...trustedMdxPolicy,
  mdxOptions: {
    remarkPlugins: [
      // 깃허브 Flavored 마크다운 지원 추가 (version downgrade)
      remarkGfm,
      // 이모티콘 접근성 향상
      remarkA11yEmoji,
      // mdx 1줄 개행 지원
      remarkBreaks,
    ],
    rehypePlugins: [
      // pretty code block
      [rehypePrettyCode, { theme: "github-dark-high-contrast" }],
      // toc id를 추가하고 제목을 연결
      rehypeSlug,
    ],
  },
};

export const PostBody = ({ content }: Props) => {
  return (
    <>
      <PostTableOfContents articleId="post-content" />
      <article
        id="post-content"
        className="prose reading-body"
        style={{ maxWidth: "100%", fontSize: 14, color: "rgb(78, 77, 77)" }}
      >
        <MDXRemote
          source={content}
          options={trustedMdxOptions}
          components={{
            pre: (props) => (
              <pre tabIndex={0} aria-label="코드 예제" {...props} />
            ),
            table: (props) => (
              <div
                className="table-scroll"
                role="region"
                aria-label="표"
                tabIndex={0}
              >
                <table {...props} />
              </div>
            ),
            a: A,
            img: Image,
            blockquote: Callout,
            ImageWithText,
          }}
        />
      </article>
    </>
  );
};
