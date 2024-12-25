import { PropsWithChildren } from "react";

import { Link, LinkProps } from "@chakra-ui/react";

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

export const Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <>
      <img src={src} alt={alt} className="mx-auto mb-0 mt-8 rounded-md" />
      {alt !== "" && (
        <span className="mb-8 mt-2 block w-full text-center text-sm text-gray-500 dark:text-gray-400">
          {alt}
        </span>
      )}
    </>
  );
};

export const A = (props: LinkProps) => {
  return (
    <Link
      color="black"
      textDecoration="underline"
      fontWeight={700}
      className="break-words"
      isExternal
      {...props}
    />
  );
};
