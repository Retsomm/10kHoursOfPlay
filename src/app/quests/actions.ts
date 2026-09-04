"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { computeCooldownUntil, type QuestScope } from "@/lib/quests";

export const createQuest = async (input: {
  title: string;
  scope: QuestScope;
  questType?: string;
  star1Criteria?: string;
  star2Criteria?: string;
  star3Criteria?: string;
  reward?: string;
  sourceChapterId?: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("尚未登入");
  if (!input.title.trim()) throw new Error("任務名稱不能是空的");

  const supabase = createAdminClient();
  const { error } = await supabase.from("quests").insert({
    user_id: userId,
    title: input.title.trim(),
    scope: input.scope,
    quest_type: input.questType || null,
    star1_criteria: input.star1Criteria || null,
    star2_criteria: input.star2Criteria || null,
    star3_criteria: input.star3Criteria || null,
    reward: input.reward || null,
    source_chapter_id: input.sourceChapterId || null,
  });
  if (error) throw new Error(`新增任務失敗：${error.message}`);

  revalidatePath("/quests");
  revalidatePath("/dashboard");
};

export const reportQuestOutcome = async (questId: string, stars: 0 | 1 | 2 | 3) => {
  const { userId } = await auth();
  if (!userId) throw new Error("尚未登入");

  const supabase = createAdminClient();
  const isFailure = stars === 0;
  const { data, error } = await supabase
    .from("quests")
    .update({
      current_stars: stars,
      status: isFailure ? "cooldown" : "completed",
      cooldown_until: isFailure ? computeCooldownUntil() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", questId)
    .eq("user_id", userId)
    .eq("status", "active")
    .select("id");
  if (error) throw new Error(`更新任務結果失敗：${error.message}`);
  if (!data || data.length === 0) throw new Error("這個任務目前不是進行中，無法回報結果");

  revalidatePath("/quests");
  revalidatePath("/dashboard");
};

export const restartQuest = async (questId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("尚未登入");

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("quests")
    .update({ status: "active", current_stars: 0, cooldown_until: null, updated_at: new Date().toISOString() })
    .eq("id", questId)
    .eq("user_id", userId)
    .eq("status", "cooldown")
    .lte("cooldown_until", new Date().toISOString())
    .select("id");
  if (error) throw new Error(`重新開始任務失敗：${error.message}`);
  if (!data || data.length === 0) throw new Error("這個任務還在冷卻中，或不是冷卻狀態，無法重新開始");

  revalidatePath("/quests");
  revalidatePath("/dashboard");
};

export const abandonQuest = async (questId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("尚未登入");

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("quests")
    .update({ status: "abandoned", updated_at: new Date().toISOString() })
    .eq("id", questId)
    .eq("user_id", userId);
  if (error) throw new Error(`放棄任務失敗：${error.message}`);

  revalidatePath("/quests");
  revalidatePath("/dashboard");
};
