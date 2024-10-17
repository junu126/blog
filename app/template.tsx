import type { ReactNode } from "react";

import { PageNav } from "@/components/layout/PageNav";
import { PageMain } from "@/components/layout/PageMain";
import { PageFooter } from "@/components/layout/PageFooter";

interface Props {
  children: ReactNode;
}

export default function BaseTemplate({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-start">
      <PageMain>
        {children}
        <PageFooter />
      </PageMain>
      <PageNav />
    </div>
  );
}
