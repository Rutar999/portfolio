"use client";

import { useEffect, useRef } from "react";

/**
 * ============================================================================
 * 背景のオーロラ演出（Canvas 2D で自前描画）
 * ============================================================================
 *
 * 【なぜ画像や動画を使わないのか】
 *   画像だと数百 KB〜数 MB の通信が発生し、表示速度が落ちます。
 *   ここでは数十行の計算だけで描いているので、追加の通信はゼロです。
 *
 * 【なぜ速いのか】
 *   実際のキャンバスは画面の 1/5 のサイズしか使っていません（RESOLUTION）。
 *   小さく描いた絵を CSS で引き伸ばし、blur をかけてぼかしています。
 *   ぼかす前提なので粗さは見えず、塗るピクセル数が 1/25 で済みます。
 *
 * 【"use client" とは】
 *   Next.js の App Router では、コンポーネントは既定でサーバー側で実行されます。
 *   マウス操作やアニメーションはブラウザ側の仕事なので、
 *   このファイルの先頭で「これはブラウザで動かす」と宣言しています。
 */

/** 描画解像度の倍率。小さいほど軽いが、粗くなる（ぼかすので 0.2 で十分） */
const RESOLUTION = 0.2;

/** 光の玉ひとつぶんの設定 */
type Blob = {
  /** 中心位置（0〜1 の割合で持つ。画面サイズが変わっても崩れないため） */
  x: number;
  y: number;
  /** 半径（画面幅に対する割合） */
  radius: number;
  color: string;
  /** 移動速度 */
  vx: number;
  vy: number;
};

const BLOBS: Blob[] = [
  { x: 0.2, y: 0.25, radius: 0.42, color: "110, 231, 249", vx: 0.018, vy: 0.012 },
  { x: 0.78, y: 0.2, radius: 0.38, color: "167, 139, 250", vx: -0.014, vy: 0.016 },
  { x: 0.55, y: 0.72, radius: 0.45, color: "244, 114, 182", vx: 0.011, vy: -0.013 },
  { x: 0.12, y: 0.8, radius: 0.3, color: "99, 102, 241", vx: 0.016, vy: -0.01 },
];

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // OS の「視差効果を減らす」設定を尊重する
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 各 blob の現在位置（0〜1）。BLOBS を直接書き換えないようコピーする
    const positions = BLOBS.map((b) => ({ x: b.x, y: b.y }));

    // マウス位置（追いかける先）と、実際に描く位置（少し遅れて追従させる）
    const pointer = { x: 0.5, y: 0.5 };
    const pointerSmooth = { x: 0.5, y: 0.5 };

    let width = 0;
    let height = 0;

    /** 画面サイズが変わったときにキャンバスの大きさを合わせ直す */
    const resize = () => {
      width = Math.max(1, Math.floor(window.innerWidth * RESOLUTION));
      height = Math.max(1, Math.floor(window.innerHeight * RESOLUTION));
      canvas.width = width;
      canvas.height = height;
    };

    /** 光の玉を1つ描く。中心が明るく、外に向かって透明になる円を重ねる */
    const drawBlob = (
      cx: number,
      cy: number,
      radius: number,
      color: string,
      alpha: number
    ) => {
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
      gradient.addColorStop(0.55, `rgba(${color}, ${alpha * 0.28})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    /** 1フレームぶんの描画 */
    const render = (timeSeconds: number) => {
      // 背景を下地色で塗りつぶす
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#05060a";
      ctx.fillRect(0, 0, width, height);

      // 以降は「重ねるほど明るくなる」合成モードにする（光の表現）
      ctx.globalCompositeOperation = "lighter";

      BLOBS.forEach((blob, i) => {
        const pos = positions[i];

        if (!reduceMotion) {
          // sin / cos でゆっくり8の字を描くように動かす
          pos.x = blob.x + Math.sin(timeSeconds * blob.vx * 6) * 0.12;
          pos.y = blob.y + Math.cos(timeSeconds * blob.vy * 6) * 0.1;
        }

        // マウスに寄せる量。玉ごとに少しずつ変えて奥行きを出す（視差効果）
        const parallax = 0.06 + i * 0.02;
        const cx =
          (pos.x + (pointerSmooth.x - 0.5) * parallax) * width;
        const cy =
          (pos.y + (pointerSmooth.y - 0.5) * parallax) * height;

        drawBlob(cx, cy, blob.radius * width, blob.color, 0.5);
      });

      // マウスに追従する小さな光
      if (!reduceMotion) {
        drawBlob(
          pointerSmooth.x * width,
          pointerSmooth.y * height,
          width * 0.16,
          "255, 255, 255",
          0.06
        );
      }
    };

    let frameId = 0;
    const start = performance.now();

    const loop = (now: number) => {
      // 実際のマウス位置へ 8% ずつ近づける＝ぬるっと遅れて追従する動き
      pointerSmooth.x += (pointer.x - pointerSmooth.x) * 0.08;
      pointerSmooth.y += (pointer.y - pointerSmooth.y) * 0.08;

      render((now - start) / 1000);
      frameId = requestAnimationFrame(loop);
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = e.clientY / window.innerHeight;
    };

    /** 別タブを見ているあいだは描画を止めてバッテリーを節約する */
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameId);
      } else {
        frameId = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    if (reduceMotion) {
      // 動きを止める設定のときは、1枚だけ描いて終わり
      render(0);
    } else {
      frameId = requestAnimationFrame(loop);
    }

    // コンポーネントが消えるときの後片付け。これを忘れると裏で動き続けます
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    // aria-hidden: 装飾なので、読み上げソフトには無視させる
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        // 低解像度で描いた絵をぼかして引き伸ばす（粗さを消す）
        style={{ filter: "blur(64px) saturate(1.25)", transform: "scale(1.15)" }}
      />
      {/* 上下を暗く落として、文字を読みやすくする */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      {/* 細い格子模様。何もない空間に密度を出すための定番手法 */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
