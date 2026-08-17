import { marqueeWords } from "@/data/site";

/**
 * ============================================================================
 * 横に流れるテキスト帯（マーキー）
 * ============================================================================
 * 仕組みはシンプルです。
 *   1. 同じ内容の並びを 2 回ぶん横に並べる
 *   2. 全体を「幅の半分ぶん」だけ左へ動かす（globals.css の @keyframes marquee）
 *   3. 半分＝ちょうど1セットぶんなので、切れ目なく無限ループして見える
 *
 * JavaScript を一切使っていないので、サーバー側だけで完結します（軽い）。
 */
export default function Marquee() {
  return (
    <div
      aria-hidden
      className="relative flex overflow-hidden border-y border-line py-5"
      // 両端をフェードさせて、唐突に切れないようにする
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {/* 2 セットぶん出力する */}
        {[...marqueeWords, ...marqueeWords].map((word, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-mono text-sm tracking-wider text-muted transition-colors">
              {word}
            </span>
            <span className="h-1 w-1 rounded-full bg-accent/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
