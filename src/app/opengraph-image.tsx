import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * ============================================================================
 * OGP 画像（SNS でシェアされたときに出るサムネイル）の自動生成
 * ============================================================================
 * 画像編集ソフトで作る代わりに、HTML と CSS で書いた内容を
 * Next.js がビルド時に PNG へ変換してくれます。
 * 文言を変えたくなったら、画像を作り直さずコードを直すだけで済みます。
 *
 * 注意: 既定のフォントは日本語を持っていないため、ここは英語表記にしています。
 *       日本語を入れたい場合はフォントファイルの読み込み指定が必要です。
 */

export const alt = `${site.nameEn} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#05060a",
          // 背景のオーロラを、複数の放射グラデーションで再現
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(110,231,249,0.55), transparent 55%), radial-gradient(circle at 88% 12%, rgba(167,139,250,0.55), transparent 55%), radial-gradient(circle at 60% 95%, rgba(244,114,182,0.45), transparent 55%)",
          color: "#e9ecf5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
            fontSize: 22,
            letterSpacing: "0.28em",
            color: "#878ea6",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#6ee7f9",
            }}
          />
          Portfolio
        </div>

        <div style={{ display: "flex", fontSize: 118, fontWeight: 700, lineHeight: 1 }}>
          {site.nameEn}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 54,
            fontWeight: 700,
            marginTop: 12,
            color: "#a78bfa",
          }}
        >
          {site.role}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 26,
            color: "#878ea6",
          }}
        >
          Kotlin · Jetpack Compose · TypeScript · Next.js
        </div>
      </div>
    ),
    size
  );
}
