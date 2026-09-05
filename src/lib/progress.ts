import { TIERS, type Tier } from "@/types/content";

export interface ProgressRow {
  chapter_id: string;
  tier: string;
  completed_at: string | null;
}

export type ChapterProgress = Record<Tier, string | null>;
export type ProgressMap = Record<string, ChapterProgress>;

export const buildProgressMap = (rows: ProgressRow[]): ProgressMap => {
  const map: ProgressMap = {};
  for (const row of rows) {
    if (!map[row.chapter_id]) {
      map[row.chapter_id] = { easy: null, medium: null, hard: null };
    }
    map[row.chapter_id][row.tier as Tier] = row.completed_at;
  }
  return map;
};

export const getChapterProgress = (map: ProgressMap, chapterId: string): ChapterProgress => {
  return map[chapterId] ?? { easy: null, medium: null, hard: null };
};

export const isTierCompleted = (progress: ChapterProgress, tier: Tier): boolean => {
  return Boolean(progress[tier]);
};

export const completedTierCount = (progress: ChapterProgress): number => {
  return TIERS.filter((t) => progress[t]).length;
};

// 簡單／中等／困難是同一個主題的三種不同深度練習，不是彼此的先修關卡——
// 章節只要完成任一難度就算通關，不強制三個都要填、也不需要依序解鎖。
export const isChapterComplete = (progress: ChapterProgress): boolean => {
  return completedTierCount(progress) >= 1;
};

export const completedChapterCount = (map: ProgressMap, chapterIds: string[]): number => {
  return chapterIds.filter((id) => isChapterComplete(getChapterProgress(map, id))).length;
};
