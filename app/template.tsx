import type { ReactNode } from "react";

import { Cloud } from "@/components/ui/Cloud";

interface Props {
  children: ReactNode;
}

export default function BaseTemplate({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div
        style={{ padding: "120px 16px 0px" }}
        className="flex flex-col items-center justify-between max-w-3xl h-screen"
      >
        {children}
      </div>
      <nav
        style={{ zIndex: 1, height: 120 }}
        className="fixed top-0 w-full p-0"
      >
        <div style={{ zIndex: 2, height: 48 }} className="relative">
          <div
            style={{ padding: "0px 24px" }}
            className="h-full w-full flex gap-2"
          >
            <button>버튼1</button>
            <button>버튼2</button>
            <button>버튼3</button>
          </div>
        </div>
        <Cloud style={{ zIndex: 1 }} className="absolute bottom-0" />
      </nav>
    </div>
  );
}
