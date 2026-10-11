"use client";
import type { HTMLAttributes } from "react";
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
  const active = NAVIGATION_ITEMS.find(({ href }) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`),
  );
  return (
    <nav aria-label="주요 메뉴" className="site-nav" {...props}>
      <div className="site-nav-inner">
        <LinkSegmentedControl
          activeItem={active ?? null}
          items={NAVIGATION_ITEMS}
        />
      </div>
      <div className="z-1 absolute bottom-0 w-full h-full">
        <Cloud />
      </div>
    </nav>
  );
}
