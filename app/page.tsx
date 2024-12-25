import { Fragment } from "react";

import { getPosts } from "@/lib/post";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@chakra-ui/react";

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
      <PageHeader
        title="Junukim.dev"
        description="Product engineer based in seoul, south korea"
      >
        <div>
          <PageHeader.Text>
            어떻게 살아야 행복할까? 자주 고민합니다. 매 순간마다 즐겁게 살고
            싶어요.
          </PageHeader.Text>
          <br />
          <PageHeader.Text>
            매일같이 마주하는 도전과 선택 속에서, 우리는 스스로를 발견하고
            조금씩 성장하죠. 이곳은 제가 경험한 작은 성공과 실패, 그리고 그
            속에서 배운 이야기들을 기록한 곳이에요. 또 누구에게나 실패는
            아프지만, 그 속에 숨어 있는 배움은 더 큰 도약으로 이어질 수 있다고
            믿어요. 이곳은 도전을 두려워하지 않고, 넘어짐 속에서 배운 것들을
            기록한 공간이에요.
          </PageHeader.Text>
          <br />
          <PageHeader.Text>
            현재&nbsp;
            <Link
              color="black"
              fontWeight={700}
              href="https://flex.team/"
              isExternal
            >
              flex
            </Link>
            에서 Product engineer로 일하고 있어요.
            <br />
            보다 편리하고 단순하게 만드는 것에 열광해요. 그리고 오래오래 Long
            run 하기 위해 노력해요.
          </PageHeader.Text>
        </div>
      </PageHeader>
      <div className="flex flex-col gap-2 w-full">
        {posts.map((post) => (
          <Fragment key={post.title}>
            <p>
              <span>{post.modifiedAt}</span>
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
