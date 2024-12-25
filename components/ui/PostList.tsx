import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

import { InternalLink } from "./InternalLink";
import { Post } from "@/lib/post";
import { formatDate } from "@/lib/date";

PostList.Item = PostListItem;
export function PostList(props: { children: ReactNode }) {
  return <Box as="section" className="flex flex-col gap-2 w-full" {...props} />;
}

function PostListItem(props: { post: Post }) {
  const { post } = props;

  const isArticle = post.tag === "articles";
  const href = isArticle ? `/articles/${post.slug}` : `/thoughts/${post.slug}`;

  return (
    <InternalLink
      href={href}
      height="38px"
      paddingLeft={1}
      paddingRight={2}
      borderRadius="2px"
      _active={{ transform: "scale(0.99)" }}
    >
      <Box className="flex size-full justify-between items-center gap-4">
        <Text fontSize={13} fontWeight={400} lineHeight="24px">
          {post.title}
        </Text>
        <Text as="span" fontSize={10} fontWeight={300}>
          {formatDate(post.modifiedAt, "yyyy. MM. dd")}
        </Text>
      </Box>
    </InternalLink>
  );
}
