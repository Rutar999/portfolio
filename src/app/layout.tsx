import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

/**
 * next/font を使うと、ビルド時にフォントを自分のサーバーに取り込んでくれます。
 * Google Fonts へブラウザからアクセスしにいかないので、
 * 表示が速くなり、外部へのアクセスも発生しません。
 * variable: で CSS 変数名を決め、globals.css の --font-sans から参照しています。
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
  weight: ["400", "500", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

/**
 * metadata は Next.js が <head> タグに変換してくれる仕組みです。
 * 自分で <title> や <meta> を書く必要はありません。
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "ポートフォリオ",
    "Android",
    "Kotlin",
    "Jetpack Compose",
    "Next.js",
    "TypeScript",
    site.name,
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: `${site.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** テーマカラー（スマホのアドレスバーの色）は viewport 側で指定します */
export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased">
        {/* キーボード操作の方が、ナビを飛ばして本文へ行けるようにするリンク */}
        <a href="#main" className="sr-only-focusable">
          本文へスキップ
        </a>
        {children}
      </body>
    </html>
  );
}
