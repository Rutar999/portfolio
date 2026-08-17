"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/data/site";

/**
 * ============================================================================
 * 画面上部に固定されるヘッダー
 * ============================================================================
 * 3つの役割があります。
 *   1. スクロール進捗バー（ページのどこまで読んだかを一番上の線で示す）
 *   2. 現在見ているセクションをナビ上で光らせる
 *   3. スマホ用のメニュー開閉
 */
export default function Header() {
  // useScroll でページ全体のスクロール量（0〜1）が取れる
  const { scrollYProgress } = useScroll();
  // そのままだとカクつくので、バネ物理でなめらかにする
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  /** 少しでもスクロールしたらヘッダーをすりガラスにする */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * IntersectionObserver で「いま画面の中央付近にあるセクション」を検出する。
   * スクロールイベントで毎回位置計算するより、ブラウザ任せのこちらが軽い。
   */
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      // 画面の上 20%〜下 60% の帯に入ったセクションを「現在地」とみなす
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /** メニューを開いているあいだは背面をスクロールさせない */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        {/* スクロール進捗バー */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
        />

        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {site.nameEn}
            <span className="text-muted transition-colors group-hover:text-accent">
              .dev
            </span>
          </a>

          {/* PC 用ナビ */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-colors ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {/* 現在地の背景。layoutId を同じにすると、
                      別の要素へ「移動する」アニメーションになります */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/8 ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              className="ml-3 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 font-mono text-xs tracking-wider text-accent transition-all hover:bg-accent/20 hover:shadow-[0_0_24px_-4px] hover:shadow-accent/50"
            >
              Get in touch
            </a>
          </nav>

          {/* スマホ用の開閉ボタン */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-fg transition-colors hover:bg-white/5 md:hidden"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* スマホ用のメニュー本体。
          AnimatePresence は「消えるときのアニメーション」を可能にする仕組みです */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-3">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  className="px-8 py-3 text-3xl font-bold text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
