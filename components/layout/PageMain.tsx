import type { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function PageMain({ children, ...props }: Props) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="page-main flex flex-col items-center justify-between min-h-screen w-full"
      {...props}
    >
      {children}
    </main>
  );
}
