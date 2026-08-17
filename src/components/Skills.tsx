"use client";

import { motion } from "motion/react";
import { skillGroups } from "@/data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/**
 * Skills セクション。
 * バーは画面に入った瞬間に 0% から伸びます。
 * whileInView に width を渡すだけで実装できます。
 */
export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:py-36">
      {/* セクションの背景を少しだけ明るくして、面の切り替わりを作る */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="使える道具と、その練度。"
          description="数値は自己評価です。実務経験の長さではなく、「調べながらなら実装できる」から「設計の判断ができる」までの度合いを表しています。"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 0.12}>
              <div className="h-full rounded-2xl glass p-7 transition-colors hover:border-white/18">
                {/* グループ見出し */}
                <div className="mb-8 flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: group.accent,
                      boxShadow: `0 0 14px ${group.accent}`,
                    }}
                  />
                  <h3 className="font-mono text-sm tracking-[0.2em] uppercase">
                    {group.category}
                  </h3>
                </div>

                {/* スキル一覧 */}
                <ul className="space-y-6">
                  {group.items.map((skill, i) => (
                    <li key={skill.name}>
                      <div className="mb-2.5 flex items-baseline justify-between gap-3">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="font-mono text-[11px] text-muted">
                          {skill.level}
                        </span>
                      </div>

                      {/* バーの土台 */}
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        {/* 実際に伸びる部分。
                            色は CSS 変数（var(--color-accent) など）で渡ってくるので、
                            "#6ee7f955" のような末尾追加での半透明化はできません。
                            変数のまま透明度を混ぜられる color-mix() を使います。 */}
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, color-mix(in oklab, ${group.accent} 45%, transparent), ${group.accent})`,
                            boxShadow: `0 0 12px -2px ${group.accent}`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{
                            duration: 1.1,
                            delay: 0.15 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
