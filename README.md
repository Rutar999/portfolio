# Portfolio

Rutar のポートフォリオサイト。**サイトそのものを制作物として見せる**ことを目的に、
最新の Web 技術スタックで実装しています。

## 技術構成

| 領域 | 採用 | 補足 |
|---|---|---|
| フレームワーク | Next.js 16.3.1（App Router） | React のフレームワーク。ルーティングや最適化を担当 |
| ライブラリ | React 19.2.8 | 画面を組み立てる本体 |
| 言語 | TypeScript 5 | 型があるので、書き間違いをビルド時に発見できる |
| スタイル | Tailwind CSS v4 | CSS ファイルを書かず、クラス名でスタイルを当てる方式 |
| アニメーション | Motion 13（旧 Framer Motion） | スクロール連動・出現アニメーション |
| アイコン | lucide-react | MIT ライセンスのアイコン集 |
| ビルド | Turbopack | Next.js 標準のビルドツール |
| フォント | next/font（Inter / Noto Sans JP / JetBrains Mono） | ビルド時に取り込むので外部通信なし |

追加の UI ライブラリ（MUI・shadcn/ui 等）やアニメーションライブラリは使わず、
背景演出や進捗バーは自前で実装しています。依存を増やさない方針です。

### ライセンス

依存パッケージはすべて MIT ライセンスです（Next.js / React / Tailwind CSS / Motion / lucide-react）。
商用利用・改変・再配布に制限はありません。

## 開発の始め方

```bash
npm install
```

開発サーバーを起動する（ファイルを保存すると自動で画面が更新されます）:

```bash
npm run dev
```

起動したら http://localhost:3000 を開いてください。

本番用にビルドして、その結果を確認する:

```bash
npm run build
```

```bash
npm run start
```

コードの書き方をチェックする:

```bash
npm run lint
```

## ファイル構成

```
src/
├── app/
│   ├── layout.tsx           全ページ共通の枠。フォント読み込みと SEO 情報
│   ├── page.tsx             トップページ。各セクションを並べているだけ
│   ├── opengraph-image.tsx  SNS シェア時のサムネイル画像を自動生成
│   └── globals.css          配色などのデザイントークンとベーススタイル
├── components/
│   ├── AuroraBackground.tsx 背景のオーロラ演出（Canvas で自前描画）
│   ├── Header.tsx           固定ヘッダー・進捗バー・現在地表示
│   ├── Hero.tsx             ファーストビュー
│   ├── Marquee.tsx          横に流れる技術スタックの帯
│   ├── About.tsx            自己紹介と数値
│   ├── Skills.tsx           スキルとバー
│   ├── Works.tsx            制作物一覧と画像の拡大表示
│   ├── Contact.tsx          連絡先
│   ├── Footer.tsx           フッター
│   ├── Reveal.tsx           スクロールで出現させる共通部品
│   └── SectionHeading.tsx   セクション見出しの共通部品
├── data/
│   └── site.ts              ★ 掲載内容はすべてここ
└── public/
    └── works/appshelf/      アプリのスクリーンショット
```

## 内容を書き換えるには

**`src/data/site.ts` だけを編集してください。** 見た目のコードを触る必要はありません。

| やりたいこと | 編集する場所 |
|---|---|
| 名前・肩書き・紹介文を変える | `site` |
| 公開 URL を設定する（デプロイ後に必須） | `site.url` |
| GitHub アカウントを変える | `site.github` / `site.githubHandle` |
| 連絡手段を増やす（X など） | `contactLinks` に 1 行追加 |
| 自己紹介の文章を変える | `aboutParagraphs` |
| 数値の実績を変える | `stats` |
| スキルと数値を変える | `skillGroups` |
| 制作物を追加・差し替える | `works` |

制作物に画像を追加するときは `public/works/<作品名>/` に置き、
`works` の `image` / `gallery` にそのパスを書きます（先頭は `/works/...`）。

## 公開（デプロイ）手順

Vercel での公開を想定しています。

1. GitHub にこのリポジトリを push する
2. https://vercel.com/new でそのリポジトリを選ぶ
3. 設定はすべて既定のまま「Deploy」を押す（Next.js は自動判別されます）
4. 発行された URL を `src/data/site.ts` の `site.url` に書き戻して、再度 push する

`site.url` を実際の URL にしないと、SNS シェア時のサムネイル画像が
正しく表示されません（絶対 URL が必要なため）。

## 実装上の判断メモ

- **背景に画像・動画を使わない** — Canvas 2D で描画。画面の 1/5 の解像度で描いて
  CSS でぼかしながら引き伸ばすことで、塗るピクセル数を 1/25 に抑えています
- **メールアドレスを公開しない** — 公開ページに生のアドレスを書くと自動収集ロボットに拾われ、
  迷惑メールの標的になるため。連絡手段は GitHub に集約しています
- **問い合わせフォームを置かない** — 送信を受け取るサーバーが必要になり、
  「静的ファイルだけで動く」という利点が失われるため
- **`prefers-reduced-motion` に対応** — OS で「視差効果を減らす」を設定している方には
  アニメーションを自動停止します（WCAG 2.3.3）
- **キーボード操作に対応** — 本文へのスキップリンク、フォーカスリング、
  拡大表示の Esc キーでの閉じるを実装
