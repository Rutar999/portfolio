import { aboutParagraphs, stats } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * About セクション。
 * 左に文章、右に数値を置く構成です。
 * 採用担当者は文章を全部は読まないので、
 * 「数値だけ見ても伝わる」状態を右側で担保しています。
 */
export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="機能を足すより、判断できる形に整える。"
        />

        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* 左：文章 */}
          <div className="space-y-6">
            {aboutParagraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="leading-[1.9] text-muted md:text-[17px]">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="mt-10 border-l-2 border-accent/50 pl-6">
                <p className="text-lg leading-relaxed font-medium text-fg">
                  「収集しません」と書くのではなく、
                  <br className="hidden sm:block" />
                  技術的に不可能な状態にする。
                </p>
                <p className="mt-2 font-mono text-xs tracking-wider text-muted">
                  — 設計の判断基準
                </p>
              </div>
            </Reveal>
          </div>

          {/* 右：数値カード
              self-start を付けないと、左の文章の高さに合わせて
              カードが縦に引き伸ばされ、中身がスカスカに見えてしまいます */}
          <div className="grid grid-cols-2 gap-4 self-start">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} from="right">
                <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-colors hover:border-white/20">
                  {/* ホバーで薄く光る面 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-2 font-mono text-3xl font-bold text-gradient md:text-4xl">
                      {stat.value}
                    </div>
                    <div className="text-xs leading-relaxed text-muted">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
