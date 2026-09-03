import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { appConfigured } from "@/lib/env";
import { getChapter } from "@/data/chapters";
import { TIERS } from "@/types/content";
import { buildProgressMap, getChapterProgress, isTierUnlocked, isTierCompleted } from "@/lib/progress";
import { buildAnswersMap, getTierAnswers } from "@/lib/answers";
import TierForm from "@/components/TierForm";
import LockedTierPanel from "@/components/LockedTierPanel";
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
  const [
    { data: progressRows, error: progressError },
    { data: answerRows, error: answersError },
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
  ]);
  if (progressError) throw new Error(`讀取進度失敗：${progressError.message}`);
  if (answersError) throw new Error(`讀取答案失敗：${answersError.message}`);

  const progressMap = buildProgressMap(progressRows ?? []);
  const progress = getChapterProgress(progressMap, chapterId);
  const answersMap = buildAnswersMap(answerRows ?? []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm text-dim hover:text-[var(--color-accent)]">
          ← 回到角色卡
        </Link>
        <p className="font-display text-sm text-dim mt-4">{chapter.number}</p>
        <h1 className="font-display text-2xl md:text-3xl font-bold mt-1">{chapter.title}</h1>
        <p className="text-dim mt-1">{chapter.subtitle}</p>
      </div>

      <div className="space-y-6">
        {TIERS.map((tier) => {
          const unlocked = isTierUnlocked(progress, tier);
          if (!unlocked) return <LockedTierPanel key={tier} tier={tier} />;
          return (
            <TierForm
              key={tier}
              chapterId={chapterId}
              tier={tier}
              content={chapter.tiers[tier]}
              initialValues={getTierAnswers(answersMap, chapterId, tier)}
              completed={isTierCompleted(progress, tier)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChapterPage;
