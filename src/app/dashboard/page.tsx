import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { createAdminClient } from "@/lib/supabase/admin";
import { appConfigured } from "@/lib/env";
import { CHAPTERS } from "@/data/chapters";
import { PHASE_LABEL, type Phase } from "@/types/content";
import { buildProgressMap, getChapterProgress, totalCompletedTiers } from "@/lib/progress";
import { buildAnswersMap } from "@/lib/answers";
import {
  computeHeroLevel,
  extractAlignmentRadar,
  extractAlliances,
  extractFutureVision,
  extractJourneyEvents,
  extractMilestones,
  extractPyramid,
  extractSkillWeb,
} from "@/lib/heroStatus";
import { computeQuestCounts, isMissingQuestsTableError, type Quest } from "@/lib/quests";
import ChapterCard from "@/components/ChapterCard";
import HeroNameEditor from "@/components/HeroNameEditor";
import SignOutButton from "@/components/SignOutButton";
import SetupNotice from "@/components/SetupNotice";
import HeroLevelBadge from "@/components/hero/HeroLevelBadge";
import TalentPyramid from "@/components/hero/TalentPyramid";
import AlignmentRadar from "@/components/hero/AlignmentRadar";
import SkillWebRadar from "@/components/hero/SkillWebRadar";
import AllianceRoster from "@/components/hero/AllianceRoster";
import JourneyTimeline from "@/components/hero/JourneyTimeline";
import QuestSummaryCard from "@/components/hero/QuestSummaryCard";

const PHASES: Phase[] = ["I", "II"];

const DashboardPage = async () => {
  if (!appConfigured()) return <SetupNotice />;

  const { userId } = await auth();
  if (!userId) redirect("/login");

  const supabase = createAdminClient();
  const [
    { data: profile, error: profileError },
    { data: progressRows, error: progressError },
    { data: answerRows, error: answersError },
    { data: quests, error: questsError },
    user,
  ] = await Promise.all([
    supabase.from("profiles").select("hero_name").eq("user_id", userId).maybeSingle(),
    supabase
      .from("chapter_progress")
      .select("chapter_id, tier, completed_at")
      .eq("user_id", userId),
    supabase
      .from("answers")
      .select("chapter_id, tier, field_key, value")
      .eq("user_id", userId),
    supabase.from("quests").select("status").eq("user_id", userId),
    currentUser(),
  ]);
  if (profileError) throw new Error(`讀取角色資料失敗：${profileError.message}`);
  if (progressError) throw new Error(`讀取進度失敗：${progressError.message}`);
  if (answersError) throw new Error(`讀取答案失敗：${answersError.message}`);
  // quests 表是 Phase 3 才新增的：只容許「表還不存在」這個特定錯誤，其他錯誤
  // （權限、網路、其他原因）一律照既有規則往外拋，不要被這個特例悄悄吞掉。
  const questsMigrationPending = isMissingQuestsTableError(questsError);
  if (questsError && !questsMigrationPending) {
    throw new Error(`讀取任務失敗：${questsError.message}`);
  }

  const defaultName = profile?.hero_name || user?.fullName || user?.username || "";
  const progressMap = buildProgressMap(progressRows ?? []);
  const answersMap = buildAnswersMap(answerRows ?? []);
  const chapterIds = CHAPTERS.map((c) => c.id);
  const chapterTitles = Object.fromEntries(CHAPTERS.map((c) => [c.id, c.title]));
  const phase1Ids = CHAPTERS.filter((c) => c.phase === "I").map((c) => c.id);
  const totalTiers = chapterIds.length * 3;
  const done = totalCompletedTiers(progressMap, chapterIds);

  const heroLevel = computeHeroLevel(progressMap, phase1Ids, chapterIds, "ch9");
  const talentPyramid = extractPyramid(answersMap, {
    chapterId: "ch3-1",
    tier: "hard",
    edgeKey: "edge",
    ringKey: "ring",
    baseKey: "base",
  });
  const skillPyramid = extractPyramid(answersMap, {
    chapterId: "ch5-1",
    tier: "easy",
    ringKey: "ring_skills",
    baseKey: "base_skills",
  });
  const alignmentAxes = extractAlignmentRadar(answersMap, "ch9");
  const skillWebAxes = extractSkillWeb(answersMap, "ch5-2");
  const alliances = extractAlliances(answersMap, "ch6");
  const journeyEvents = extractJourneyEvents(progressMap, chapterIds);
  const milestones = extractMilestones(answersMap, "ch8");
  const futureVision = extractFutureVision(answersMap, "ch8");
  const questCounts = computeQuestCounts((quests ?? []) as Pick<Quest, "status">[]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10 min-w-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-xs text-dim">10,000 HOURS OF PLAY</p>
          <div className="mt-2">
            <HeroNameEditor initialName={defaultName} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SignOutButton />
          <UserButton />
        </div>
      </div>

      <div className="panel p-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-dim">整體進度</span>
          <span className="font-display">
            {done} / {totalTiers} 關卡
          </span>
        </div>
        <div className="h-2 rounded-full bg-black/40 overflow-hidden">
          <div
            className="h-full bg-[var(--color-accent)]"
            style={{ width: `${totalTiers > 0 ? (done / totalTiers) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-display text-xs text-dim tracking-widest">英雄狀態</p>
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))]">
          <HeroLevelBadge info={heroLevel} />
          <AlignmentRadar axes={alignmentAxes} chapterHref="/chapters/ch9" />
          <SkillWebRadar axes={skillWebAxes} chapterHref="/chapters/ch5-2" />
          <TalentPyramid title="天賦金字塔" data={talentPyramid} />
          <TalentPyramid title="技能金字塔" data={skillPyramid} />
          <AllianceRoster contacts={alliances} chapterHref="/chapters/ch6" />
          <QuestSummaryCard counts={questCounts} migrationPending={questsMigrationPending} />
        </div>
      </div>

      <JourneyTimeline
        events={journeyEvents}
        chapterTitles={chapterTitles}
        milestones={milestones}
        futureVision={futureVision}
      />

      {PHASES.map((phase) => (
        <div key={phase} className="space-y-4">
          <p className="font-display text-xs text-dim tracking-widest">{PHASE_LABEL[phase]}</p>
          <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))]">
            {CHAPTERS.filter((c) => c.phase === phase).map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                progress={getChapterProgress(progressMap, chapter.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
