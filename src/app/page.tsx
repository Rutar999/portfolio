import About from "@/components/About";
import AuroraBackground from "@/components/AuroraBackground";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
import { site } from "@/data/site";

/**
 * 構造化データ（JSON-LD）。
 * 検索エンジンに「これは人物のプロフィールページだ」と機械可読な形で伝えます。
 * 検索結果での見え方が良くなることがあり、書いておいて損はありません。
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  sameAs: [site.github],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD は <script> の中身として埋め込む必要があるため、
        // React の仕組み上ここだけ dangerouslySetInnerHTML を使います。
        // 埋め込む値は自分で書いた定数なので、外部入力による危険はありません。
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AuroraBackground />
      <Header />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Works />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
