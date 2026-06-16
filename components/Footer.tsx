// Quiet editorial footer. One contact intent; GitHub is the real channel.
export function Footer() {
  return (
    <footer className="mt-28 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <p className="display max-w-[16ch] break-keep text-3xl font-semibold text-ink sm:text-4xl">
              함께 만들 게 있다면.
            </p>
            <a
              href="https://github.com/siosio34"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-5 inline-block text-lg text-accent-deep"
            >
              github.com/siosio34
            </a>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:col-span-5">
            <div>
              <p className="meta-label">링크</p>
              <ul className="mt-3 space-y-2 text-ink-soft">
                <li>
                  <a
                    href="https://github.com/siosio34"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://onlyup-duai.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    DUDU 플레이
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="meta-label">소개</p>
              <p className="mt-3 max-w-[24ch] break-keep text-sm leading-relaxed text-ink-mute">
                Heka가 만든 프로젝트와 Claude Code 스킬을 모은 갤러리. Next.js와
                Tailwind로 제작했고, 비주얼은 스톡이 아니라 실제 산출물입니다.
              </p>
            </div>
          </div>
        </div>
        <p className="meta-label mt-14">© 2026 Heka의 프로젝트 갤러리</p>
      </div>
    </footer>
  );
}
