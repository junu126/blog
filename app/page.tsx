import { Fragment } from "react";

import { getPosts } from "@/lib/post";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
      }}
    >
      <div style={{ maxWidth: 720, flex: 1 }}>
        <p style={{ fontSize: 40 }}>언제 다 만들지</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {posts.map((post) => (
          <Fragment key={post.title}>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
            <p>
              <span>{post.title}</span>
            </p>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
