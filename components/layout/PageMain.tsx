import type { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function PageMain({ children, ...props }: Props) {
  return (
    <main
      style={{ maxWidth: 720, padding: "120px 16px 0px" }}
      className="flex flex-col items-center justify-between min-h-screen w-full"
      {...props}
    >
      {children}
    </main>
  );
}
