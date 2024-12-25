// @ts-expect-error no types
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { A, Callout, Image } from "./mdx-ui";

interface Props {
  content: string;
}

export const PostBody = ({ content }: Props) => {
  return (
    <article
      className="prose"
      style={{ maxWidth: "100%", fontSize: 14, color: "rgb(78, 77, 77)" }}
    >
      <MDXRemote
        source={content}
        options={{
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
              [
                // @ts-ignore
                rehypePrettyCode,
              ],
              // toc id를 추가하고 제목을 연결
              rehypeSlug,
            ],
          },
        }}
        components={{
          a: A,
          img: Image,
          blockquote: Callout,
        }}
      />
    </article>
  );
};
