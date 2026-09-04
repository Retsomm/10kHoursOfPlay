import "server-only";
import { createAdminClient } from "./supabase/admin";
import { buildProgressMap, type ProgressMap } from "./progress";
import { buildAnswersMap, type AnswersMap } from "./answers";
import { computeQuestCounts, isMissingQuestsTableError, type Quest, type QuestCounts } from "./quests";

export const getProfile = async (userId: string): Promise<{ hero_name: string | null } | null> => {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("hero_name")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`讀取角色資料失敗：${error.message}`);
  return data;
};

export const getProgressMap = async (userId: string): Promise<ProgressMap> => {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("chapter_progress")
    .select("chapter_id, tier, completed_at")
    .eq("user_id", userId);
  if (error) throw new Error(`讀取進度失敗：${error.message}`);
  return buildProgressMap(data ?? []);
};

export const getAnswersMap = async (userId: string, chapterIds?: string[]): Promise<AnswersMap> => {
  const supabase = createAdminClient();
  let query = supabase
    .from("answers")
    .select("chapter_id, tier, field_key, value")
    .eq("user_id", userId);
  if (chapterIds) query = query.in("chapter_id", chapterIds);
  const { data, error } = await query;
  if (error) throw new Error(`讀取答案失敗：${error.message}`);
  return buildAnswersMap(data ?? []);
};

export interface QuestSummary {
  counts: QuestCounts;
  migrationPending: boolean;
}

export const getQuestSummary = async (userId: string): Promise<QuestSummary> => {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("quests").select("status").eq("user_id", userId);
  const migrationPending = isMissingQuestsTableError(error);
  if (error && !migrationPending) throw new Error(`讀取任務失敗：${error.message}`);
  return {
    counts: computeQuestCounts((data ?? []) as Pick<Quest, "status">[]),
    migrationPending,
  };
};
