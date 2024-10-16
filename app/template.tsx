import type { ReactNode } from "react";

import { Cloud } from "@/components/ui/Cloud";

interface Props {
  children: ReactNode;
}

export default function BaseTemplate({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-start">
      <main
        style={{ maxWidth: 720, padding: "120px 16px 0px" }}
        className="flex flex-col items-center justify-between h-screen w-full"
      >
        {children}
        <footer
          style={{ padding: "48px 0px 64px 0px" }}
          className="w-full flex flex-col"
        >
          <span>footer</span>
        </footer>
      </main>
      <nav style={{ height: 120 }} className="z-1 fixed top-0 w-full p-0">
        <div style={{ height: 48 }} className="z-2 relative">
          <div
            style={{ padding: "0px 24px" }}
            className="h-full w-full flex gap-2"
          >
            <button>버튼1</button>
            <button>버튼2</button>
            <button>버튼3</button>
          </div>
        </div>
        <div className="z-1 absolute bottom-0 w-full h-full">
          <Cloud />
        </div>
      </nav>
    </div>
  );
}
