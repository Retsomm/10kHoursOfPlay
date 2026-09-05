import { TIERS, type Tier } from "@/types/content";
import type { AnswersMap } from "./answers";
import { getTierAnswers } from "./answers";
import type { ProgressMap } from "./progress";
import { completedChapterCount, getChapterProgress, isChapterComplete } from "./progress";

export type HeroLevel = "npc" | "player" | "opPlayer" | "opHero";

export const HERO_LEVEL_LABEL: Record<HeroLevel, string> = {
  npc: "NPC",
  player: "10K HP PLAYER",
  opPlayer: "OP PLAYER",
  opHero: "OP HERO",
};

export interface HeroLevelInfo {
  level: HeroLevel;
  phase1Complete: boolean;
  completedChapters: number;
  totalChapters: number;
}

// 章節只要完成任一難度就算通關（見 progress.ts 的 isChapterComplete），
// 所以這裡一律用「已通關的章節數」而不是「已完成的關卡數」來算等級。
export const computeHeroLevel = (
  progressMap: ProgressMap,
  phase1ChapterIds: string[],
  allChapterIds: string[],
  ch9Id: string,
): HeroLevelInfo => {
  const totalChapters = allChapterIds.length;
  const completedChapters = completedChapterCount(progressMap, allChapterIds);
  const phase1Complete =
    phase1ChapterIds.length > 0 && completedChapterCount(progressMap, phase1ChapterIds) === phase1ChapterIds.length;
  const ch9Complete = isChapterComplete(getChapterProgress(progressMap, ch9Id));

  let level: HeroLevel = "npc";
  if (totalChapters > 0 && completedChapters === totalChapters) level = "opHero";
  else if (phase1Complete && ch9Complete) level = "opPlayer";
  else if (completedChapters > 0) level = "player";

  return { level, phase1Complete, completedChapters, totalChapters };
};

const cleanList = (value: unknown): string[] =>
  Array.isArray(value)
    ? (value as unknown[]).map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean)
    : [];

export interface PyramidData {
  edge?: string;
  ring: string[];
  base: string[];
}

export const extractPyramid = (
  answersMap: AnswersMap,
  source: { chapterId: string; tier: Tier; edgeKey?: string; ringKey: string; baseKey: string },
): PyramidData => {
  const tierAnswers = getTierAnswers(answersMap, source.chapterId, source.tier);
  const rawEdge = source.edgeKey ? tierAnswers[source.edgeKey] : undefined;
  // edge 欄位存的是單一項目的 list（陣列），舊資料若是純字串也一併相容
  const edge =
    typeof rawEdge === "string"
      ? rawEdge.trim() || undefined
      : cleanList(rawEdge)[0];
  return {
    edge,
    ring: cleanList(tierAnswers[source.ringKey]),
    base: cleanList(tierAnswers[source.baseKey]),
  };
};

export interface RadarAxis {
  key: string;
  label: string;
  value: number;
}

const ALIGNMENT_AXES: { key: string; label: string }[] = [
  { key: "right_game_rating", label: "遊戲" },
  { key: "attributes_rating", label: "屬性" },
  { key: "role_rating", label: "角色" },
  { key: "skills_rating", label: "技能" },
  { key: "allies_rating", label: "盟友" },
  { key: "quests_rating", label: "任務" },
];

export const extractAlignmentRadar = (answersMap: AnswersMap, ch9Id: string): RadarAxis[] => {
  const tierAnswers = getTierAnswers(answersMap, ch9Id, "easy");
  return ALIGNMENT_AXES.map((axis) => ({
    key: axis.key,
    label: axis.label,
    value: typeof tierAnswers[axis.key] === "number" ? (tierAnswers[axis.key] as number) : 0,
  }));
};

export const SKILL_CLASSES: { key: string; label: string }[] = [
  { key: "warrior", label: "戰士" },
  { key: "ranger", label: "遊俠" },
  { key: "mage", label: "法師" },
  { key: "rogue", label: "盜賊" },
  { key: "druid", label: "德魯伊" },
  { key: "paladin", label: "聖騎士" },
  { key: "warlock", label: "術士" },
];

export const extractSkillWeb = (answersMap: AnswersMap, ch52Id: string): RadarAxis[] => {
  const tierAnswers = getTierAnswers(answersMap, ch52Id, "easy");
  const raw = tierAnswers["class"];
  const record = typeof raw === "object" && raw !== null ? (raw as Record<string, number>) : {};
  return SKILL_CLASSES.map((cls) => ({
    key: cls.key,
    label: cls.label,
    value: typeof record[cls.key] === "number" ? record[cls.key] : 0,
  }));
};

export interface AllianceContact {
  name: string;
  relationship: string;
  trust?: string;
  note?: string;
}

const VALID_RELATIONSHIPS = new Set(["faction", "guild", "party", "partnership"]);

export const extractAlliances = (answersMap: AnswersMap, ch6Id: string): AllianceContact[] => {
  const tierAnswers = getTierAnswers(answersMap, ch6Id, "easy");
  const raw = tierAnswers["current_alliances"];
  if (!Array.isArray(raw)) return [];
  return (raw as AllianceContact[]).filter(
    (c) =>
      c &&
      typeof c.name === "string" &&
      c.name.trim().length > 0 &&
      VALID_RELATIONSHIPS.has(c.relationship),
  );
};

export interface JourneyEvent {
  chapterId: string;
  tier: Tier;
  completedAt: string;
}

export const extractJourneyEvents = (progressMap: ProgressMap, chapterIds: string[]): JourneyEvent[] => {
  const events: JourneyEvent[] = [];
  for (const chapterId of chapterIds) {
    const progress = getChapterProgress(progressMap, chapterId);
    // 章節現在完成任一難度就算通關，同一章節常常不只一個難度有完成時間——
    // 只取最早完成的那個難度當這個章節在地圖上的里程碑，同一個章節在地圖上
    // 只出現一次，不要因為多填了一種難度就重複出現。
    let earliest: { tier: Tier; completedAt: string } | null = null;
    for (const tier of TIERS) {
      const completedAt = progress[tier];
      if (!completedAt) continue;
      if (!earliest || new Date(completedAt).getTime() < new Date(earliest.completedAt).getTime()) {
        earliest = { tier, completedAt };
      }
    }
    if (earliest) events.push({ chapterId, tier: earliest.tier, completedAt: earliest.completedAt });
  }
  return events.sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
};

export const extractMilestones = (answersMap: AnswersMap, ch8Id: string): string[] => {
  const tierAnswers = getTierAnswers(answersMap, ch8Id, "easy");
  return cleanList(tierAnswers["milestones"]);
};

export interface FutureVision {
  fiveYearGoals: string[];
  taskBreakdown: string[];
  taskCategories: string[];
  timeline: string[];
}

export const extractFutureVision = (answersMap: AnswersMap, ch8Id: string): FutureVision => {
  const tierAnswers = getTierAnswers(answersMap, ch8Id, "hard");
  return {
    fiveYearGoals: cleanList(tierAnswers["five_year_goals"]),
    taskBreakdown: cleanList(tierAnswers["task_breakdown"]),
    taskCategories: cleanList(tierAnswers["task_categories"]),
    timeline: cleanList(tierAnswers["timeline"]),
  };
};
