// Quiet editorial footer. One contact intent, reused from the nav.
export function Footer() {
  return (
    <footer className="mt-28 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <p className="display max-w-[20ch] text-3xl font-semibold text-ink sm:text-4xl">
              Have something worth building?
            </p>
            <a
              href="mailto:hello@example.com"
              className="link-underline mt-5 inline-block text-lg text-accent-deep"
            >
              hello@example.com
            </a>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:col-span-5">
            <div>
              <p className="meta-label">Elsewhere</p>
              <ul className="mt-3 space-y-2 text-ink-soft">
                <li>
                  <a href="#" className="link-underline">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="link-underline">
                    Writing
                  </a>
                </li>
                <li>
                  <a href="#" className="link-underline">
                    Read.cv
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="meta-label">Index</p>
              <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-ink-mute">
                Built with Next.js, Framer Motion, and GSAP. Visuals drawn from
                data, not stock.
              </p>
            </div>
          </div>
        </div>
        <p className="meta-label mt-14">© {new Date().getFullYear()} Index</p>
      </div>
    </footer>
  );
}
