import Reveal from "./Reveal";

/**
 * 各セクションの見出し。
 * 「01 / About」のような通し番号を添えると、
 * ページ全体に統一感と"設計されている感"が出ます。
 */
type Props = {
  /** 通し番号（"01" など） */
  index: string;
  /** 英語の小見出し */
  eyebrow: string;
  /** 日本語の主見出し */
  title: string;
  /** 補足説明（任意） */
  description?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <div className="mb-14 max-w-2xl md:mb-20">
      <Reveal>
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-xs tracking-[0.3em] text-accent">
            {index}
          </span>
          {/* 見出し横に伸びる短い線。細部だが全体の完成度が上がる */}
          <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
          <span className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="text-3xl leading-tight font-bold text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
