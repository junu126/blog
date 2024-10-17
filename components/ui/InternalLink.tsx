"use client";
import type { LinkProps } from "@chakra-ui/next-js";
import { Link } from "@chakra-ui/next-js";

export function InternalLink(props: LinkProps) {
  return <Link {...props} />;
}
