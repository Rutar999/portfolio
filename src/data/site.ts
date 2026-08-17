/**
 * ============================================================================
 * サイトの掲載内容はすべてこのファイルに集約しています。
 * 文言や作品を差し替えたいときは、原則ここだけを編集すれば反映されます。
 * （コンポーネント側＝見た目のコードは触らなくて済むようにしてあります）
 * ============================================================================
 */

/** サイト全体の基本情報。<head> のメタ情報や OGP にも使われます */
export const site = {
  name: "Rutar",
  nameEn: "Rutar",
  role: "Android / Web Developer",
  tagline: "つくるのは、判断できる材料。",
  description:
    "Kotlin と TypeScript で、ローカル完結・オフライン前提のアプリをつくっています。使う人が自分で判断できる形まで情報を整えることを大切にしています。",
  // ▼ デプロイ後に実際の URL に書き換えてください（OGP 画像の絶対 URL 生成に使います）
  url: "https://example.vercel.app",
  location: "Japan",
  // 連絡先はメールアドレスを公開せず、GitHub に集約しています。
  // 生のアドレスを公開ページに置くと、収集ロボットに拾われて迷惑メールの標的になるためです。
  github: "https://github.com/Rutar999",
  githubHandle: "@Rutar999",
} as const;

/** ヘッダーのナビゲーション。href はページ内アンカー */
export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
] as const;

/** Hero 下に流れるテキストの帯（マーキー）に出す語句 */
export const marqueeWords = [
  "Kotlin",
  "Jetpack Compose",
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Room",
  "Coroutines",
  "MVVM",
  "Material 3",
  "Offline First",
  "Accessibility",
] as const;

/** About セクションの本文。段落ごとに配列の要素を分けています */
export const aboutParagraphs = [
  "個人開発で Android アプリをつくっています。直近のリリースは、端末に入っているアプリを一覧・検索・分析して整理する『アプリ棚卸し』です。",
  "設計で一番時間をかけたのは、機能の数ではなく「消してよいと判断できるだけの材料が揃っているか」でした。最終起動日が取れない端末ではインストール日で代替表示する、権限をカテゴリから逆引きできるようにする、といった判断はすべてそこから来ています。",
  "通信を一切しない設計にするため INTERNET 権限そのものを宣言していません。「収集しません」と書くのではなく、技術的に不可能な状態にする方を選びました。",
] as const;

/** About セクション右側に並べる数値。numeric な実績は採用担当者が拾いやすい */
export const stats = [
  { value: "1.0.0", label: "リリース済みアプリ" },
  { value: "0", label: "宣言した通信権限" },
  { value: "26+", label: "対応 Android API" },
  { value: "100%", label: "オフライン動作" },
] as const;

/**
 * Skills セクション。
 * level は自己評価（0〜100）で、バーの長さに使います。
 */
export const skillGroups = [
  {
    category: "Mobile",
    accent: "var(--color-accent)",
    items: [
      { name: "Kotlin", level: 80 },
      { name: "Jetpack Compose", level: 78 },
      { name: "Room / DataStore", level: 70 },
      { name: "Coroutines / Flow", level: 68 },
    ],
  },
  {
    category: "Web",
    accent: "var(--color-accent-2)",
    items: [
      { name: "TypeScript", level: 72 },
      { name: "React / Next.js", level: 70 },
      { name: "Tailwind CSS", level: 75 },
      { name: "HTML / CSS", level: 82 },
    ],
  },
  {
    category: "Practice",
    accent: "var(--color-accent-3)",
    items: [
      { name: "Git / GitHub", level: 72 },
      { name: "MVVM 設計", level: 70 },
      { name: "アクセシビリティ", level: 65 },
      { name: "ドキュメント作成", level: 85 },
    ],
  },
] as const;

/** 作品1件ぶんの型定義。TypeScript なので、書き忘れがあるとビルド時に気づけます */
export type Work = {
  /** URL やキーに使う一意な ID */
  slug: string;
  title: string;
  subtitle: string;
  /** 一覧カードに出す短い説明 */
  description: string;
  /** 「設計上こだわった点」。採用担当者が最も読む部分 */
  highlights: string[];
  tags: string[];
  year: string;
  /** public/ 配下の画像パス。null ならプレースホルダー表示になります */
  image: string | null;
  /** 複数枚のスクリーンショット（詳細表示用） */
  gallery?: string[];
  links?: { label: string; href: string }[];
  /** true にするとグリッド内で大きく表示されます */
  featured?: boolean;
  /** 制作中の作品につけると "WIP" バッジが出ます */
  wip?: boolean;
};

export const works: Work[] = [
  {
    slug: "appshelf",
    title: "アプリ棚卸し",
    subtitle: "AppShelf — Android Utility",
    description:
      "端末にインストール済みのアプリを一覧・検索・分析し、整理判断まで支援するローカル完結型ユーティリティ。通信を行わないため、データが端末外に出ることが技術的に発生しません。",
    highlights: [
      "INTERNET 権限を宣言しないことで、データ送信を仕様ではなく構造で不可能にした",
      "「マイクを使えるアプリ 8 件」のように、権限カテゴリからアプリを逆引きできる導線を実装",
      "使用状況の権限が未許可の端末でも、インストール日で代替表示して機能が死なないようにした",
      "棒グラフを含む UI を外部ライブラリなしで Compose のみで自作し、依存を最小化",
    ],
    tags: ["Kotlin", "Jetpack Compose", "Room", "MVVM", "Material 3"],
    year: "2026",
    image: "/works/appshelf/01_home.png",
    gallery: [
      "/works/appshelf/01_home.png",
      "/works/appshelf/02_applist.png",
      "/works/appshelf/03_permissions.png",
      "/works/appshelf/04_permission_lookup.png",
      "/works/appshelf/05_detail.png",
      "/works/appshelf/06_multiselect.png",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Rutar999" }],
    featured: true,
  },
  {
    slug: "portfolio",
    title: "このポートフォリオサイト",
    subtitle: "Portfolio — Web",
    description:
      "いま見ていただいているサイトそのものが制作物です。Next.js 16 の App Router を土台に、Canvas による背景描画とスクロール連動アニメーションを実装しています。",
    highlights: [
      "背景のオーロラは Canvas 2D による自前描画。マウス位置に追従し、画像を一切読み込まない",
      "Tailwind CSS v4 の @theme でデザイントークンを定義し、配色を CSS 変数一箇所で管理",
      "prefers-reduced-motion に対応し、動きが苦手な方には自動でアニメーションを停止",
      "掲載内容を data/site.ts に集約し、見た目のコードを触らず更新できる構成にした",
    ],
    tags: ["Next.js 16", "TypeScript", "Tailwind v4", "Motion", "Canvas"],
    year: "2026",
    image: null,
    links: [
      { label: "ソースコード", href: "https://github.com/Rutar999/portfolio" },
    ],
  },
  {
    slug: "next",
    title: "Next Project",
    subtitle: "Coming Soon",
    description:
      "次の制作物を準備中です。完成しだいこの枠に差し替えます。",
    highlights: [],
    tags: ["TBD"],
    year: "2026",
    image: null,
    wip: true,
  },
];

/**
 * Contact セクションのリンク。
 * 連絡手段を増やしたくなったら、ここに 1 行足すだけで表示に反映されます。
 *   例）{ label: "X", value: "@xxxx", href: "https://x.com/xxxx" }
 * メールを載せる場合は href を `mailto:...` にしてください
 * （ただし迷惑メール対策として、公開用の専用アドレスを推奨します）。
 */
export const contactLinks = [
  { label: "GitHub", value: site.githubHandle, href: site.github },
] as const;
