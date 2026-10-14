"use client";

import { preload } from "react-dom";

export function FontPreload() {
  preload("/fonts/pretendard-v1.3.9/PretendardVariable.subset.91.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  return null;
}
