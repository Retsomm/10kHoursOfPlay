"use client";

import { useState } from "react";
import HeroNameEditor from "./HeroNameEditor";
import HeroLevelBadge from "./hero/HeroLevelBadge";
import AlignmentRadar from "./hero/AlignmentRadar";
import SkillWebRadar from "./hero/SkillWebRadar";
import QuestSummaryCard from "./hero/QuestSummaryCard";
import ChapterCard from "./ChapterCard";
import { PHASE_LABEL, type ChapterContent, type Phase } from "@/types/content";
import type { ChapterProgress } from "@/lib/progress";
import type { HeroLevelInfo, RadarAxis } from "@/lib/heroStatus";
import type { QuestCounts } from "@/lib/quests";

const SUB_TABS = [
  { key: "overview", label: "總覽" },
  { key: "chapters", label: "章節" },
  { key: "data", label: "個人資料" },
] as const;

type SubTabKey = (typeof SUB_TABS)[number]["key"];

const PHASES: Phase[] = ["I", "II"];
const EMPTY_PROGRESS: ChapterProgress = { easy: null, medium: null, hard: null };

const ProfileTabs = ({
  defaultName,
  heroLevel,
  alignmentAxes,
  skillWebAxes,
  questCounts,
  questMigrationPending,
  chapters,
  progressByChapter,
  totalTiers,
  doneTiers,
}: {
  defaultName: string;
  heroLevel: HeroLevelInfo;
  alignmentAxes: RadarAxis[];
  skillWebAxes: RadarAxis[];
  questCounts: QuestCounts;
  questMigrationPending: boolean;
  chapters: ChapterContent[];
  progressByChapter: Record<string, ChapterProgress>;
  totalTiers: number;
  doneTiers: number;
}) => {
  const [active, setActive] = useState<SubTabKey>("overview");

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-display transition ${
              active === tab.key
                ? "bg-[var(--color-accent)] text-[#04121f]"
                : "border border-[var(--color-border-bright)] text-dim hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "data" && (
        <div className="space-y-2">
          <p className="font-display text-sm text-dim tracking-widest">個人資料</p>
          <HeroNameEditor initialName={defaultName} />
        </div>
      )}

      {active === "overview" && (
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))]">
          <HeroLevelBadge info={heroLevel} />
          <AlignmentRadar axes={alignmentAxes} chapterHref="/chapters/ch9" />
          <SkillWebRadar axes={skillWebAxes} chapterHref="/chapters/ch5-2" />
          <QuestSummaryCard counts={questCounts} migrationPending={questMigrationPending} />
        </div>
      )}

      {active === "chapters" && (
        <div className="space-y-6">
          <div className="panel p-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-dim">整體進度</span>
              <span className="font-display">
                {doneTiers} / {totalTiers} 關卡
              </span>
            </div>
            <div className="h-2 rounded-full bg-black/40 overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)]"
                style={{ width: `${totalTiers > 0 ? (doneTiers / totalTiers) * 100 : 0}%` }}
              />
            </div>
          </div>

          {PHASES.map((phase) => (
            <div key={phase} className="space-y-4">
              <p className="font-display text-sm text-dim tracking-widest">{PHASE_LABEL[phase]}</p>
              <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))]">
                {chapters
                  .filter((c) => c.phase === phase)
                  .map((chapter) => (
                    <ChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      progress={progressByChapter[chapter.id] ?? EMPTY_PROGRESS}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileTabs;
