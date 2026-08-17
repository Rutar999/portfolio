"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * ============================================================================
 * スクロールで要素をふわっと出す共通部品
 * ============================================================================
 *
 * 使い方:
 *   <Reveal>中身</Reveal>
 *   <Reveal delay={0.1}>少し遅れて出す</Reveal>
 *
 * motion（旧 Framer Motion）の whileInView を使うと、
 * 「画面に入ったら animate の状態へ変化させる」が1行で書けます。
 * 自分で IntersectionObserver を書く必要がありません。
 */

type Props = {
  children: ReactNode;
  /** 何秒遅らせて出すか。並んだ要素を順番に出したいときに使う */
  delay?: number;
  /** どの方向から出てくるか */
  from?: "bottom" | "left" | "right" | "none";
  className?: string;
};

const offset = {
  bottom: { y: 28, x: 0 },
  left: { y: 0, x: -28 },
  right: { y: 0, x: 28 },
  none: { y: 0, x: 0 },
};

export default function Reveal({
  children,
  delay = 0,
  from = "bottom",
  className,
}: Props) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset[from], filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay,
        // ease-out 系のカーブ。最初速く、最後ゆっくり止まるので上品に見える
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      // once: true → 一度出たら、戻ってきても再生し直さない（うるさくならない）
      // margin → 画面下からこの距離だけ手前で発火させる
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
