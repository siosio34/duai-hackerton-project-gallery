import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://duai-hackerton-project-gallery.vercel.app"),
  title: {
    default: "Heka의 프로젝트 갤러리",
    template: "%s · Heka의 프로젝트 갤러리",
  },
  description:
    "Heka가 직접 만들고 배포한 프로젝트와 Claude Code 스킬을 전시하는 갤러리. 3D 게임부터 리서치·평가 자동화까지, 각 작업을 열면 어떻게 만들었는지로 이어집니다.",
  openGraph: {
    title: "Heka의 프로젝트 갤러리",
    description:
      "Heka가 직접 만들고 배포한 프로젝트와 Claude Code 스킬을 전시하는 갤러리.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <div className="grain" aria-hidden="true" />
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          본문으로 건너뛰기
        </a>
        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  );
}
