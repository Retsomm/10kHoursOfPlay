import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { appConfigured } from "@/lib/env";
import { CHAPTERS } from "@/data/chapters";
import { computeHeroLevel, extractAlignmentRadar, extractSkillWeb } from "@/lib/heroStatus";
import { getAnswersMap, getProfile, getProgressMap, getQuestSummary } from "@/lib/dashboardData";
import { getChapterProgress, totalCompletedTiers } from "@/lib/progress";
import { computeSixStepProgress } from "@/lib/sixSteps";
import { computeNextStep } from "@/lib/nextStep";
import SetupNotice from "@/components/SetupNotice";
import DashboardShell from "@/components/DashboardShell";
import ProfileTabs from "@/components/ProfileTabs";

const chapterIds = CHAPTERS.map((c) => c.id);
const phase1Ids = CHAPTERS.filter((c) => c.phase === "I").map((c) => c.id);

const ProfilePage = async () => {
  if (!appConfigured()) return <SetupNotice />;

  const { userId } = await auth();
  if (!userId) redirect("/login");

  const [profile, progressMap, answersMap, questSummary, user] = await Promise.all([
    getProfile(userId),
    getProgressMap(userId),
    getAnswersMap(userId, ["ch9", "ch5-2"]),
    getQuestSummary(userId),
    currentUser(),
  ]);

  const defaultName = profile?.hero_name || user?.fullName || user?.username || "";
  const heroLevel = computeHeroLevel(progressMap, phase1Ids, chapterIds, "ch9");
  const alignmentAxes = extractAlignmentRadar(answersMap, "ch9");
  const skillWebAxes = extractSkillWeb(answersMap, "ch5-2");
  const totalTiers = chapterIds.length * 3;
  const doneTiers = totalCompletedTiers(progressMap, chapterIds);
  const progressByChapter = Object.fromEntries(
    chapterIds.map((id) => [id, getChapterProgress(progressMap, id)]),
  );
  const sixSteps = computeSixStepProgress(progressMap);
  const ch9Done = totalCompletedTiers(progressMap, ["ch9"]);
  const nextStep = computeNextStep(progressMap, sixSteps, ch9Done, questSummary.counts);

  return (
    <DashboardShell>
      <ProfileTabs
        defaultName={defaultName}
        heroLevel={heroLevel}
        alignmentAxes={alignmentAxes}
        skillWebAxes={skillWebAxes}
        questCounts={questSummary.counts}
        questMigrationPending={questSummary.migrationPending}
        chapters={CHAPTERS}
        progressByChapter={progressByChapter}
        totalTiers={totalTiers}
        doneTiers={doneTiers}
        sixSteps={sixSteps}
        nextStep={nextStep}
      />
    </DashboardShell>
  );
};

export default ProfilePage;
