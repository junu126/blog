import { getPosts } from "@/lib/post";
import { PageHeader } from "@/components/layout/PageHeader";
import { Link } from "@chakra-ui/react";
import { PostList } from "@/components/post/PostList";

const posts = await getPosts();

export default function Home() {
  return (
    <div
      className="w-full"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 28,
      }}
    >
      <PageHeader
        title="Junukim.me"
        description={
          <>
            "There is no magic to achievement. It's really about hard work,
            choices and persistence."
          </>
        }
      >
        <div>
          <PageHeader.Text>
            어떻게 살아야 행복할까? 자주 고민합니다. 매 순간마다 즐겁게 살고
            싶어요.
          </PageHeader.Text>
          <br />
          <PageHeader.Text>
            매일같이 마주하는 도전과 선택 속에서 우리는 스스로를 발견하고,
            조금씩 성장해 나갑니다. 이곳은 제가 경험한 작은 성공과 실패, 그리고
            그 속에서 배운 이야기들을 기록한 곳이에요. 누구에게나 실패는
            아프지만, 그 속에 숨어 있는 배움이 더 큰 도약으로 이어질 수 있다고
            믿어요.
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
            보다 편리하고 단순하게 만드는 것에 열광하며, 오래도록 지속 가능한
            삶과 일을 위해 노력하고 있습니다.
          </PageHeader.Text>
        </div>
      </PageHeader>
      <PostList>
        {posts.map((post) => (
          <PostList.Item key={post.slug} post={post} />
        ))}
      </PostList>
    </div>
  );
}
