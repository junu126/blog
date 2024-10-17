"use client";

import type { HTMLAttributes } from "react";

import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import { Cloud } from "../ui/Cloud";
import { LinkSegmentedControl } from "../ui/LinkSegmentedControl";

const NAVIGATION_ITEMS = [
  { id: "index", title: "Index", href: "/" },
  { id: "articles", title: "Articles", href: "/articles" },
  { id: "thoughts", title: "Thoughts", href: "/thoughts" },
];

export function PageNav(props: HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const activeControl = NAVIGATION_ITEMS.find((item) => item.href === pathname);

  return (
    <Box as="nav" h="120px" className="z-1 fixed top-0 w-full p-0" {...props}>
      <Box h="48px" className="z-2 relative">
        <Box
          padding="0px 24px"
          className="h-full w-full flex gap-2 items-center"
        >
          <Box height="24px">
            <LinkSegmentedControl
              activeItem={activeControl ?? null}
              items={NAVIGATION_ITEMS}
            />
          </Box>
        </Box>
      </Box>
      <div className="z-1 absolute bottom-0 w-full h-full">
        <Cloud />
      </div>
    </Box>
  );
}
