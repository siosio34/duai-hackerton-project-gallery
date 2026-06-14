import Link from "next/link";

// Single-line sticky nav, kept under 72px. Wordmark left, contact right.
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-ink"
          aria-label="Index, home"
        >
          <span className="text-[1.05rem] font-semibold tracking-tight">
            Index
          </span>
          <span className="h-1.5 w-1.5 translate-y-[-1px] bg-accent" aria-hidden />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/#work"
            className="meta-label link-underline hidden text-ink-soft sm:inline-block"
          >
            Work
          </Link>
          <a
            href="mailto:hello@example.com"
            className="meta-label link-underline text-ink-soft"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
