import type { Tier } from "@/types/content";

export interface AnswerRow {
  chapter_id: string;
  tier: string;
  field_key: string;
  value: unknown;
}

export type AnswersMap = Record<string, Record<string, unknown>>;

function key(chapterId: string, tier: Tier) {
  return `${chapterId}:${tier}`;
}

export function buildAnswersMap(rows: AnswerRow[]): AnswersMap {
  const map: AnswersMap = {};
  for (const row of rows) {
    const k = key(row.chapter_id, row.tier as Tier);
    if (!map[k]) map[k] = {};
    map[k][row.field_key] = row.value;
  }
  return map;
}

export function getTierAnswers(
  map: AnswersMap,
  chapterId: string,
  tier: Tier,
): Record<string, unknown> {
  return map[key(chapterId, tier)] ?? {};
}
