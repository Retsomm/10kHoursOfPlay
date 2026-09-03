import { TIERS, type Tier } from "@/types/content";

export interface ProgressRow {
  chapter_id: string;
  tier: string;
  completed_at: string | null;
}

export type ChapterProgress = Record<Tier, string | null>;
export type ProgressMap = Record<string, ChapterProgress>;

export function buildProgressMap(rows: ProgressRow[]): ProgressMap {
  const map: ProgressMap = {};
  for (const row of rows) {
    if (!map[row.chapter_id]) {
      map[row.chapter_id] = { easy: null, medium: null, hard: null };
    }
    map[row.chapter_id][row.tier as Tier] = row.completed_at;
  }
  return map;
}

export function getChapterProgress(map: ProgressMap, chapterId: string): ChapterProgress {
  return map[chapterId] ?? { easy: null, medium: null, hard: null };
}

export function isTierUnlocked(progress: ChapterProgress, tier: Tier): boolean {
  const index = TIERS.indexOf(tier);
  if (index === 0) return true;
  const prevTier = TIERS[index - 1];
  return Boolean(progress[prevTier]);
}

export function isTierCompleted(progress: ChapterProgress, tier: Tier): boolean {
  return Boolean(progress[tier]);
}

export function completedTierCount(progress: ChapterProgress): number {
  return TIERS.filter((t) => progress[t]).length;
}

export function totalCompletedTiers(map: ProgressMap, chapterIds: string[]): number {
  return chapterIds.reduce((sum, id) => sum + completedTierCount(getChapterProgress(map, id)), 0);
}
