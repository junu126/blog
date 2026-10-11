import { readFile } from "node:fs/promises";
import path from "node:path";

import { cache } from "react";
import { imageSize } from "image-size";
import { sync } from "glob";

const getImagePaths = cache(() =>
  sync("**/*", {
    cwd: path.join(process.cwd(), "public", "images"),
    nodir: true,
  }),
);

// The existing Velog image was measured at 684 × 592 on 2026-10-11.
// Keep remote metadata explicit so a build never needs a network request.
const REMOTE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "https://images.velog.io/images/_junukim/post/858fe83e-e1cc-4475-a5f6-63dbcecd9c59/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-11-05%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%209.33.56.png":
    { width: 684, height: 592 },
};

export const getImageDimensions = cache(async (src: string) => {
  if (!src.startsWith("/images/")) {
    const dimensions = REMOTE_DIMENSIONS[src];
    return dimensions ? { ...dimensions, src } : undefined;
  }

  const root = path.join(process.cwd(), "public", "images");
  const imagePath = path.resolve(
    process.cwd(),
    "public",
    `.${decodeURIComponent(src)}`,
  );
  if (!imagePath.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Image must be inside public/images: ${src}`);
  }

  // Return the actual Git filename too: a composed Korean URL can work on
  // macOS but fail against a decomposed filename on a Linux deployment.
  const relative = path.relative(root, imagePath);
  const filename = getImagePaths().find(
    (file) => file.normalize("NFC") === relative.normalize("NFC"),
  );
  if (!filename) {
    throw new Error(`Image not found: ${src}`);
  }
  const buffer = await readFile(path.join(root, filename));
  const { width, height } = imageSize(buffer);
  return {
    width,
    height,
    src: `/images/${filename.split(path.sep).join("/")}`,
  };
});
