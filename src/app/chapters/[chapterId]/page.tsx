import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { appConfigured } from "@/lib/env";
import { CHAPTER_SHORT_LABEL, getChapter } from "@/data/chapters";
import { TIERS } from "@/types/content";
import { buildProgressMap, getChapterProgress, isTierCompleted } from "@/lib/progress";
import { buildAnswersMap, getTierAnswers } from "@/lib/answers";
import TierForm from "@/components/TierForm";
import SetupNotice from "@/components/SetupNotice";

const ChapterPage = async ({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) => {
  if (!appConfigured()) return <SetupNotice />;

  const { chapterId } = await params;
  const chapter = getChapter(chapterId);
  if (!chapter) notFound();

  const { userId } = await auth();
  if (!userId) redirect("/login");

  const supabase = createAdminClient();
  // Ch5-2「職業技能」的 owned_skills 想直接帶入使用者在 Ch5-1「提升技能」
  // 已經填過的戒指／基座技能，不用重新打一次——只有進到 ch5-2 時才多查這筆。
  const needsSkillPrefill = chapterId === "ch5-2";

  const [
    { data: progressRows, error: progressError },
    { data: answerRows, error: answersError },
    skillPrefillResult,
  ] = await Promise.all([
    supabase
      .from("chapter_progress")
      .select("chapter_id, tier, completed_at")
      .eq("user_id", userId)
      .eq("chapter_id", chapterId),
    supabase
      .from("answers")
      .select("chapter_id, tier, field_key, value")
      .eq("user_id", userId)
      .eq("chapter_id", chapterId),
    needsSkillPrefill
      ? supabase
          .from("answers")
          .select("chapter_id, tier, field_key, value")
          .eq("user_id", userId)
          .eq("chapter_id", "ch5-1")
      : Promise.resolve({ data: null, error: null }),
  ]);
  if (progressError) throw new Error(`讀取進度失敗：${progressError.message}`);
  if (answersError) throw new Error(`讀取答案失敗：${answersError.message}`);
  if (skillPrefillResult.error) throw new Error(`讀取技能資料失敗：${skillPrefillResult.error.message}`);

  const progressMap = buildProgressMap(progressRows ?? []);
  const progress = getChapterProgress(progressMap, chapterId);
  const answersMap = buildAnswersMap(answerRows ?? []);

  let ownedSkillsPrefill: string | undefined;
  if (needsSkillPrefill && skillPrefillResult.data) {
    const ch51Easy = getTierAnswers(buildAnswersMap(skillPrefillResult.data), "ch5-1", "easy");
    const skills = [ch51Easy.ring_skills, ch51Easy.base_skills]
      .flatMap((v) => (Array.isArray(v) ? v : []))
      .filter((s): s is string => typeof s === "string" && s.trim().length > 0);
    if (skills.length > 0) ownedSkillsPrefill = skills.join("、");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8 min-w-0">
      <div>
        <Link href="/dashboard" className="text-sm text-dim hover:text-[var(--color-accent)]">
          ← 回到角色卡
        </Link>
        <p className="font-display text-sm text-dim mt-4">{CHAPTER_SHORT_LABEL[chapterId] ?? chapter.subtitle}</p>
        <h1 className="font-display text-2xl md:text-3xl font-bold mt-1">{chapter.title}</h1>
        <p className="text-dim mt-1">{chapter.subtitle}</p>
        <p className="text-dim text-sm mt-2">
          簡單／中等／困難是同一個主題的三種不同深度練習，不用照順序填、也不用三個都填——
          完成任一個就算這個章節通關。
        </p>
      </div>

      <div className="space-y-6">
        {TIERS.map((tier) => {
          const initialValues = getTierAnswers(answersMap, chapterId, tier);
          const shouldPrefillSkills =
            ownedSkillsPrefill &&
            tier === "easy" &&
            !(typeof initialValues.owned_skills === "string" && initialValues.owned_skills.trim());
          return (
            <TierForm
              key={tier}
              chapterId={chapterId}
              tier={tier}
              content={chapter.tiers[tier]}
              initialValues={
                shouldPrefillSkills ? { ...initialValues, owned_skills: ownedSkillsPrefill } : initialValues
              }
              completed={isTierCompleted(progress, tier)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChapterPage;
