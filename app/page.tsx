import { getPosts } from "@/lib/post";
import { Fragment } from "react";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 0",
        gap: 40,
      }}
    >
      <div style={{ maxWidth: 720, flex: 1 }}>
        <p style={{ fontSize: 40 }}>주누의 새로운 블로그</p>
        <p style={{ fontSize: 40 }}>언제 다 만들지</p>
      </div>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <Fragment key={post.title}>
            <p>
              <span>{post.title}</span>
            </p>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
