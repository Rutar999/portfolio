"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { contactLinks, site } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Contact セクション。
 *
 * メールアドレスは公開していません。
 * 公開ページに生のアドレスを書くと、それを自動収集するロボットに拾われ、
 * 迷惑メールが大量に届く原因になるためです。
 * 連絡手段は GitHub に集約しています。
 *
 * 問い合わせフォームも置いていません。送信を受け取るサーバーが別途必要になり、
 * 「静的ファイルだけで動く」という構成上の利点が失われるためです。
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  /** GitHub の URL をクリップボードにコピーする */
  const copyProfileUrl = async () => {
    try {
      await navigator.clipboard.writeText(site.github);
      setCopied(true);
      // 2秒後に表示を元へ戻す
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードが使えない環境（古いブラウザ・非 HTTPS）では何もしない。
      // 下のリンクが代替手段として機能します。
    }
  };

  return (
    <section id="contact" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/*
          文言の注意:
          「制作の依頼を受け付けます」のように有償の仕事を募る表現は入れないでください。
          Vercel の無料プラン（Hobby）は非商用の個人利用に限定されており、
          「サービスの宣伝」と解釈される表現は規約に触れる可能性があるためです。
          有償の依頼を受けるようになったら、Pro プラン（$20/月）へ切り替えが必要です。
        */}
        <SectionHeading
          index="04"
          eyebrow="Contact"
          title="お話しできることを楽しみにしています。"
          description="採用のご相談、技術的な質問など、GitHub 経由でお気軽にどうぞ。"
        />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass p-8 md:p-14">
            {/* 装飾の光 */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-accent-3/18 blur-[100px]"
            />

            <div className="relative">
              <p className="mb-4 font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
                Reach me on
              </p>

              {/* GitHub のプロフィール URL を大きく見せる */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-w-0 text-2xl font-bold text-gradient sm:text-3xl md:text-4xl"
                >
                  <span className="break-all">github.com/</span>
                  <span className="break-all">
                    {site.githubHandle.replace("@", "")}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={copyProfileUrl}
                  className="shrink-0 rounded-lg border border-line bg-white/5 p-2 text-muted transition-colors hover:text-fg"
                  aria-label="プロフィールの URL をコピーする"
                >
                  {copied ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              <p
                className="mt-3 h-5 font-mono text-xs text-emerald-400 transition-opacity"
                style={{ opacity: copied ? 1 : 0 }}
                // 読み上げソフトにも「コピーしました」を伝える
                role="status"
                aria-live="polite"
              >
                {copied ? "コピーしました" : ""}
              </p>

              {/* 各種リンク */}
              <div className="mt-10 grid gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line px-5 py-4 transition-colors hover:border-white/25 hover:bg-white/5"
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                        {link.label}
                      </span>
                      <span className="mt-1 block truncate text-sm">
                        {link.value}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
