"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { site } from "@/data/site";

/**
 * ============================================================================
 * ファーストビュー（Hero）
 * ============================================================================
 * 採用担当者が最初に見る場所なので、3秒で
 *   「誰が」「何ができて」「何を作ったか」
 * が分かる並びにしています。凝った演出よりも、この情報設計が優先です。
 */

/** 見出しを1文字ずつ出すための設定 */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.028, delayChildren: 0.15 },
  },
};

const letter = {
  hidden: { opacity: 0, y: "0.4em", rotateX: -40 },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** 文字列を1文字ずつの <span> に分解して返す小さな部品 */
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      // 読み上げソフトにはバラバラの文字ではなく、元の文章として読ませる
      aria-label={text}
    >
      {Array.from(text).map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={letter}
          aria-hidden
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* ステータスバッジ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/4 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            Open to opportunities
          </span>
        </motion.div>

        {/* 主見出し */}
        <h1 className="mb-8 text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.95] font-bold tracking-tight">
          <SplitText text={site.nameEn} className="block" />
          <SplitText
            text={site.role}
            className="block text-gradient text-[clamp(1.5rem,5vw,3.5rem)] leading-tight"
          />
        </h1>

        {/* キャッチコピーと説明文 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-xl"
        >
          <p className="mb-4 text-xl font-medium text-fg/90 md:text-2xl">
            {site.tagline}
          </p>
          <p className="leading-relaxed text-muted">{site.description}</p>
        </motion.div>

        {/* 行動を促すボタン */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#works"
            className="group relative overflow-hidden rounded-full bg-fg px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            {/* ホバー時に左から光が走る演出 */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              制作物を見る
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </a>

          <a
            href="#contact"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-white/25 hover:bg-white/5"
          >
            連絡する
          </a>

          <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
            <MapPin size={13} />
            {site.location}
          </span>
        </motion.div>
      </div>

      {/* 下へスクロールを促す矢印 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
