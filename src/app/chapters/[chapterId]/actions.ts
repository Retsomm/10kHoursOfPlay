"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Tier } from "@/types/content";

export const submitTier = async (
  chapterId: string,
  tier: Tier,
  values: Record<string, unknown>,
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("尚未登入");

  const supabase = createAdminClient();

  const answerRows = Object.entries(values).map(([field_key, value]) => ({
    user_id: userId,
    chapter_id: chapterId,
    tier,
    field_key,
    value,
    updated_at: new Date().toISOString(),
  }));

  if (answerRows.length > 0) {
    const { error: answersError } = await supabase
      .from("answers")
      .upsert(answerRows, { onConflict: "user_id,chapter_id,tier,field_key" });
    if (answersError) throw new Error(`儲存答案失敗：${answersError.message}`);
  }

  const { error: progressError } = await supabase.from("chapter_progress").upsert(
    {
      user_id: userId,
      chapter_id: chapterId,
      tier,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,chapter_id,tier" },
  );
  if (progressError) throw new Error(`更新進度失敗：${progressError.message}`);

  revalidatePath(`/chapters/${chapterId}`);
  revalidatePath("/dashboard");
};

export const saveDraft = async (
  chapterId: string,
  tier: Tier,
  values: Record<string, unknown>,
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("尚未登入");

  const supabase = createAdminClient();

  const answerRows = Object.entries(values).map(([field_key, value]) => ({
    user_id: userId,
    chapter_id: chapterId,
    tier,
    field_key,
    value,
    updated_at: new Date().toISOString(),
  }));

  if (answerRows.length > 0) {
    const { error } = await supabase
      .from("answers")
      .upsert(answerRows, { onConflict: "user_id,chapter_id,tier,field_key" });
    if (error) throw new Error(`儲存答案失敗：${error.message}`);
  }

  revalidatePath(`/chapters/${chapterId}`);
};
