import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://duai-project-gallery.vercel.app"),
  title: {
    default: "Index — selected work",
    template: "%s — Index",
  },
  description:
    "A curated index of selected projects: realtime systems, design tooling, and field software. Built as an editorial gallery.",
  openGraph: {
    title: "Index — selected work",
    description:
      "A curated index of selected projects, built as an editorial gallery.",
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
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to work
        </a>
        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  );
}
