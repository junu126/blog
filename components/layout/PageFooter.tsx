import type { HTMLAttributes } from "react";

import { Link, Box, Divider, Text } from "@chakra-ui/react";

import { InternalLink } from "../ui/InternalLink";

export function PageFooter(props: HTMLAttributes<HTMLElement>) {
  return (
    <Box
      as="footer"
      style={{ padding: "48px 0px 64px 0px" }}
      className="w-full flex flex-col gap-4"
      {...props}
    >
      <Divider opacity={1} bg="rgb(235, 235, 235)" />
      <Box className="flex justify-between items-center w-full">
        <Box>
          <Text fontSize={13} color="rgb(181, 181, 181)" lineHeight="1em">
            © 2024
          </Text>
        </Box>
        <Box className="flex gap-4">
          <Box>
            <Link
              fontSize={13}
              color="rgb(181, 181, 181)"
              href="https://www.linkedin.com/in/%EC%A4%80%EC%9A%B0-%EA%B9%80-740320163/"
              lineHeight="1em"
              isExternal
            >
              Linkedin
            </Link>
          </Box>
          <Box className="flex items-center">
            <Divider
              opacity={1}
              h="14px"
              orientation="vertical"
              bg="rgb(235, 235, 235)"
            />
          </Box>
          <Box>
            <InternalLink
              fontSize={13}
              color="rgb(181, 181, 181)"
              href="/resume"
              lineHeight="1em"
            >
              Read.cv
            </InternalLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
