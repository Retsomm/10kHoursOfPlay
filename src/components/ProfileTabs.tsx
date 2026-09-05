"use client";

import { useState } from "react";
import HeroNameEditor from "./HeroNameEditor";
import HeroLevelBadge from "./hero/HeroLevelBadge";
import AlignmentRadar from "./hero/AlignmentRadar";
import SkillWebRadar from "./hero/SkillWebRadar";
import QuestSummaryCard from "./hero/QuestSummaryCard";
import SixStepRoadmap from "./hero/SixStepRoadmap";
import NextStepBanner from "./hero/NextStepBanner";
import ChapterCard from "./ChapterCard";
import { PHASE_LABEL, type ChapterContent, type Phase } from "@/types/content";
import type { ChapterProgress } from "@/lib/progress";
import type { HeroLevelInfo, RadarAxis } from "@/lib/heroStatus";
import type { QuestCounts } from "@/lib/quests";
import type { SixStepProgress } from "@/lib/sixSteps";
import type { NextStepSuggestion } from "@/lib/nextStep";

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
  totalChapters,
  doneChapters,
  sixSteps,
  nextStep,
}: {
  defaultName: string;
  heroLevel: HeroLevelInfo;
  alignmentAxes: RadarAxis[];
  skillWebAxes: RadarAxis[];
  questCounts: QuestCounts;
  questMigrationPending: boolean;
  chapters: ChapterContent[];
  progressByChapter: Record<string, ChapterProgress>;
  totalChapters: number;
  doneChapters: number;
  sixSteps: SixStepProgress[];
  nextStep: NextStepSuggestion;
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
                ? "bg-[var(--color-accent)] text-[#04121f] shadow-[0_0_20px_-4px_rgba(56,189,248,0.8)]"
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
        <div className="space-y-6">
          <NextStepBanner suggestion={nextStep} />
          <SixStepRoadmap steps={sixSteps} />
          <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))]">
            <HeroLevelBadge info={heroLevel} />
            <AlignmentRadar axes={alignmentAxes} chapterHref="/chapters/ch9" />
            <SkillWebRadar axes={skillWebAxes} chapterHref="/chapters/ch5-2" />
            <QuestSummaryCard counts={questCounts} migrationPending={questMigrationPending} />
          </div>
        </div>
      )}

      {active === "chapters" && (
        <div className="space-y-6">
          <div className="panel p-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-pixel text-[10px] text-dim">XP</span>
              <span className="font-tech">
                {doneChapters} / {totalChapters} 章節
              </span>
            </div>
            <div className="xp-track h-2">
              <div
                className="xp-fill"
                style={{ width: `${totalChapters > 0 ? (doneChapters / totalChapters) * 100 : 0}%` }}
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
