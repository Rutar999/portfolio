"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { works, type Work } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** スマホ画面の縦横比（実際のスクリーンショットが 1256x2500 なので、それに合わせる） */
const PHONE_RATIO = "1256 / 2500";

export default function Works() {
  // 拡大表示中の画像パス。null なら閉じている状態
  const [lightbox, setLightbox] = useState<string | null>(null);

  const featured = works.find((w) => w.featured);
  const others = works.filter((w) => !w.featured);

  /**
   * 拡大表示中の操作。
   *   - Esc キーで閉じる（モーダルの標準的な挙動。これが無いと閉じ方に迷わせます）
   *   - 開いている間は背面をスクロールさせない
   */
  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="works" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Works"
          title="つくったものと、そう決めた理由。"
          description="画面の見た目より、「なぜその実装にしたか」を書いています。技術選定の判断がいちばん伝わる部分だと考えているためです。"
        />

        {/* ───────── 主要作品（大きく1件） ───────── */}
        {featured && (
          <FeaturedWork work={featured} onOpenImage={setLightbox} />
        )}

        {/* ───────── その他の作品 ───────── */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {others.map((work, i) => (
            <Reveal key={work.slug} delay={i * 0.1}>
              <WorkCard work={work} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* ───────── 画像の拡大表示 ───────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-6 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="スクリーンショットの拡大表示"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 rounded-full border border-line bg-white/5 p-3 transition-colors hover:bg-white/12"
              aria-label="閉じる"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative h-[82vh] overflow-hidden rounded-2xl border border-line"
              style={{ aspectRatio: PHONE_RATIO }}
            >
              <Image
                src={lightbox}
                alt="アプリのスクリーンショット（拡大表示）"
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ==========================================================================
   主要作品のレイアウト
   ========================================================================== */
function FeaturedWork({
  work,
  onOpenImage,
}: {
  work: Work;
  onOpenImage: (src: string) => void;
}) {
  return (
    <Reveal>
      <article className="relative overflow-hidden rounded-3xl glass">
        {/* 左上から差し込む光。カードに立体感を出すための装飾 */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-accent/18 blur-[100px]"
        />

        <div className="relative grid gap-10 p-7 md:p-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* ── 左：説明 ── */}
          <div className="max-w-xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                Featured
              </span>
              <span className="font-mono text-xs text-muted">{work.year}</span>
            </div>

            <h3 className="text-3xl font-bold md:text-4xl">{work.title}</h3>
            <p className="mt-2 font-mono text-sm text-muted">{work.subtitle}</p>

            <p className="mt-6 leading-[1.9] text-muted">{work.description}</p>

            {/* 設計上の判断 */}
            {work.highlights.length > 0 && (
              <ul className="mt-8 space-y-3.5">
                {work.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed">
                    <Check
                      size={15}
                      className="mt-1 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span className="text-fg/85">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* 使用技術 */}
            <div className="mt-8 flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {work.links && (
              <div className="mt-8 flex flex-wrap gap-3">
                {work.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-white/25 hover:bg-white/5"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── 右：代表画面を1枚だけ大きく ── */}
          {work.gallery && work.gallery.length > 0 && (
            <button
              type="button"
              onClick={() => onOpenImage(work.gallery![0])}
              className="group relative mx-auto w-44 shrink-0 self-start overflow-hidden rounded-[1.75rem] border border-line bg-ink-soft shadow-2xl transition-transform hover:scale-[1.03] sm:w-56"
              style={{ aspectRatio: PHONE_RATIO }}
              aria-label="ホーム画面のスクリーンショットを拡大する"
            >
              <Image
                src={work.gallery[0]}
                alt={`${work.title} のホーム画面`}
                fill
                sizes="(max-width: 640px) 176px, 224px"
                className="object-cover"
                priority
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          )}
        </div>

        {/* ── 下段：全画面を横並びで（はみ出す分は横スクロール） ── */}
        {work.gallery && work.gallery.length > 1 && (
          <div className="relative border-t border-line px-7 py-7 md:px-12">
            <p className="mb-4 font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
              Screens — クリックで拡大
            </p>
            <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:thin]">
              {work.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => onOpenImage(src)}
                  className="relative w-28 shrink-0 overflow-hidden rounded-xl border border-line bg-ink-soft transition-all hover:-translate-y-1 hover:border-accent/50 sm:w-32"
                  style={{ aspectRatio: PHONE_RATIO }}
                  aria-label={`スクリーンショット ${i + 1} を拡大する`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </Reveal>
  );
}

/* ==========================================================================
   その他の作品カード
   ========================================================================== */
function WorkCard({ work }: { work: Work }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl glass p-7 transition-all hover:border-white/20">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-2/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-muted">{work.year}</span>
          {work.wip && (
            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-muted uppercase">
              WIP
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold">{work.title}</h3>
        <p className="mt-1 font-mono text-xs text-muted">{work.subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {work.description}
        </p>

        {work.highlights.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {work.highlights.map((point) => (
              <li key={point} className="flex gap-2.5 text-[13px] leading-relaxed">
                <Check size={13} className="mt-1 shrink-0 text-accent-2" aria-hidden />
                <span className="text-fg/75">{point}</span>
              </li>
            ))}
          </ul>
        )}

        {/* mt-auto でカード下端にタグを揃える（高さが違っても見た目が揃う） */}
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
