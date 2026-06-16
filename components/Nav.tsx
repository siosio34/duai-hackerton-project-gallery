import Link from "next/link";

// Single-line sticky nav, kept under 72px. Wordmark left, section jumps + GitHub
// right. Section labels collapse to icons-free short labels on mobile.
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-ink"
          aria-label="Heka의 프로젝트 갤러리, 홈"
        >
          <span className="text-[1.05rem] font-semibold tracking-tight">
            Heka
          </span>
          <span className="h-1.5 w-1.5 translate-y-[-1px] bg-accent" aria-hidden />
          <span className="meta-label hidden sm:inline-block">
            프로젝트 갤러리
          </span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-6">
          <Link
            href="/#projects"
            className="meta-label link-underline hidden text-ink-soft sm:inline-block"
          >
            프로젝트
          </Link>
          <Link
            href="/#skills"
            className="meta-label link-underline hidden text-ink-soft sm:inline-block"
          >
            스킬
          </Link>
          <a
            href="https://github.com/siosio34"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-label link-underline text-ink-soft"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
