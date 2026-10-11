import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col gap-6">
      <header className="error-page-header">
        <div>
          <h1>페이지를 찾을 수 없어요</h1>
          <p className="page-description">
            주소를 확인하거나 처음 화면에서 글을 찾아보세요.
          </p>
        </div>
      </header>
      <Link
        className="inline-flex min-h-11 w-fit items-center underline underline-offset-4"
        href="/"
      >
        처음으로 돌아가기 →
      </Link>
    </div>
  );
}
