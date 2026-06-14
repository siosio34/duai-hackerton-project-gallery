import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh]">
      <Nav />
      <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-5 sm:px-8">
        <p className="meta-label text-accent-deep">404</p>
        <h1 className="display mt-4 text-5xl font-semibold text-ink sm:text-7xl">
          No such entry.
        </h1>
        <p className="mt-4 max-w-[40ch] text-lg text-ink-soft">
          That project is not in the index. It may have been renamed or never
          existed.
        </p>
        <Link
          href="/"
          className="link-underline mt-8 inline-block w-fit text-lg text-accent-deep"
        >
          Back to the index
        </Link>
      </section>
    </main>
  );
}
