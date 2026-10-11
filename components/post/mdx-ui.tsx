import type { ComponentProps, PropsWithChildren } from "react";

import { getImageDimensions } from "@/lib/image";

import { LightboxImage } from "./LightboxImage";

export const Callout = (props: PropsWithChildren) => {
  return (
    <div
      className="my-6 flex items-center gap-3 rounded-md px-5 py-4"
      style={{ backgroundColor: "rgb(251 244 244)" }}
    >
      <div className="callout-contents flex-1">{props.children}</div>
    </div>
  );
};

export const Image = async ({ src, alt }: { src: string; alt: string }) => {
  const dimensions = await getImageDimensions(src);
  return (
    <>
      <LightboxImage
        src={dimensions?.src ?? src}
        alt={alt}
        intrinsicWidth={dimensions?.width}
        intrinsicHeight={dimensions?.height}
        className="mx-auto mb-0 mt-8"
        imageClassName="rounded-md"
      />
      {alt !== "" && (
        <span className="mb-8 mt-2 block w-full text-center text-sm text-gray-500 dark:text-gray-400">
          {alt}
        </span>
      )}
    </>
  );
};

interface ImageWithTextProps extends PropsWithChildren {
  src: string;
  alt: string;
  width?: number;
  imagePosition?: "left" | "right";
}

export const ImageWithText = async ({
  src,
  alt,
  width = 240,
  imagePosition = "left",
  children,
}: ImageWithTextProps) => {
  const isImageRight = imagePosition === "right";
  const dimensions = await getImageDimensions(src);

  return (
    <div
      className={`my-8 grid items-start gap-6 ${
        isImageRight
          ? "sm:grid-cols-[minmax(0,1fr)_auto]"
          : "sm:grid-cols-[auto_minmax(0,1fr)]"
      }`}
    >
      <LightboxImage
        src={dimensions?.src ?? src}
        alt={alt}
        width={width}
        intrinsicWidth={dimensions?.width}
        intrinsicHeight={dimensions?.height}
        className={`m-0 ${isImageRight ? "sm:order-2" : ""}`}
        imageClassName="rounded-md"
      />
      <div className={`min-w-0 ${isImageRight ? "sm:order-1" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export const A = ({ className = "", ...props }: ComponentProps<"a">) => {
  const external = /^(https?:)?\/\//.test(props.href ?? "");
  return (
    <a
      {...props}
      className={`break-words font-bold text-black underline ${className}`}
      target={external ? "_blank" : props.target}
      rel={external ? "noopener noreferrer" : props.rel}
    />
  );
};
