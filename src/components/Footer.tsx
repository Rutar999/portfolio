import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";

/** ページ末尾。使用技術を明記しておくと、サイト自体が制作物であることが伝わります */
export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {site.nameEn}
        </p>

        <p className="text-center font-mono text-xs text-muted">
          Built with Next.js 16 · TypeScript · Tailwind CSS v4
        </p>

        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg"
        >
          <ArrowUp
            size={13}
            className="transition-transform group-hover:-translate-y-0.5"
          />
          Back to top
        </a>
      </div>
    </footer>
  );
}
