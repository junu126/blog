import type { Metadata } from "next";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Articles | junukim.dev",
};

export default async function Articles() {
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
        <p style={{ fontSize: 40 }}>Articles 페이지</p>
      </div>
    </div>
  );
}
