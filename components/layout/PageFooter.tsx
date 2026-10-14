import type { HTMLAttributes } from "react";
import Link from "next/link";
export function PageFooter(props: HTMLAttributes<HTMLElement>) {
  return (
    <footer className="page-footer" {...props}>
      <hr />
      <div className="page-footer-row">
        <span>© {new Date().getFullYear()}</span>
        <div className="page-footer-links">
          <a
            href="https://www.linkedin.com/in/%EC%A4%80%EC%9A%B0-%EA%B9%80-740320163/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <span className="page-footer-divider" aria-hidden="true" />
          <Link href="/resume">Read.cv</Link>
        </div>
      </div>
    </footer>
  );
}
