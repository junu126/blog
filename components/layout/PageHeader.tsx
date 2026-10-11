import type { ReactNode } from "react";
interface Props {
  title: string;
  description: ReactNode;
  children?: ReactNode;
}
PageHeader.Text = PageHeaderText;
export function PageHeader({ title, description, children }: Props) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {children}
      <hr />
    </header>
  );
}
function PageHeaderText({
  children,
  size = "default",
  bold,
}: {
  children: ReactNode;
  size?: "default" | "small";
  bold?: boolean;
}) {
  return (
    <p
      className={`intro-text ${size === "small" ? "intro-small" : ""} ${bold ? "font-bold" : ""}`}
    >
      {children}
    </p>
  );
}
