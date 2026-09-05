import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { appConfigured } from "@/lib/env";
import { CHAPTER_SHORT_LABEL, CHAPTERS } from "@/data/chapters";
import {
  computeHeroLevel,
  extractAlliances,
  extractFutureVision,
  extractJourneyEvents,
  extractMilestones,
  extractPyramid,
} from "@/lib/heroStatus";
import { getAnswersMap, getProgressMap, getQuestSummary } from "@/lib/dashboardData";
import { totalCompletedTiers } from "@/lib/progress";
import { computeSixStepProgress } from "@/lib/sixSteps";
import { computeNextStep } from "@/lib/nextStep";
import SetupNotice from "@/components/SetupNotice";
import DashboardShell from "@/components/DashboardShell";
import JourneyMap from "@/components/hero/JourneyMap";
import JourneyHighlights from "@/components/hero/JourneyHighlights";
import TalentPyramid from "@/components/hero/TalentPyramid";
import AllianceRoster from "@/components/hero/AllianceRoster";

const chapterIds = CHAPTERS.map((c) => c.id);
const phase1Ids = CHAPTERS.filter((c) => c.phase === "I").map((c) => c.id);

const JourneyPage = async () => {
  if (!appConfigured()) return <SetupNotice />;

  const { userId } = await auth();
  if (!userId) redirect("/login");

  const [progressMap, answersMap, questSummary] = await Promise.all([
    getProgressMap(userId),
    getAnswersMap(userId, ["ch3-1", "ch5-1", "ch6", "ch8"]),
    getQuestSummary(userId),
  ]);

  const heroLevel = computeHeroLevel(progressMap, phase1Ids, chapterIds, "ch9").level;
  const journeyEvents = extractJourneyEvents(progressMap, chapterIds);
  const sixSteps = computeSixStepProgress(progressMap);
  const ch9Done = totalCompletedTiers(progressMap, ["ch9"]);
  const nextStep = computeNextStep(progressMap, sixSteps, ch9Done, questSummary.counts);
  const nextChapterId = nextStep.href.startsWith("/chapters/")
    ? nextStep.href.slice("/chapters/".length)
    : null;
  const nextChapterLabel = nextChapterId ? CHAPTER_SHORT_LABEL[nextChapterId] ?? null : null;
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
  const alliances = extractAlliances(answersMap, "ch6");
  const milestones = extractMilestones(answersMap, "ch8");
  const futureVision = extractFutureVision(answersMap, "ch8");

  return (
    <DashboardShell>
      <JourneyMap
        events={journeyEvents}
        chapterLabels={CHAPTER_SHORT_LABEL}
        heroLevel={heroLevel}
        nextChapterLabel={nextChapterLabel}
      />

      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))]">
        <TalentPyramid title="天賦金字塔" data={talentPyramid} />
        <TalentPyramid title="技能金字塔" data={skillPyramid} />
        <AllianceRoster contacts={alliances} chapterHref="/chapters/ch6" />
      </div>

      <JourneyHighlights milestones={milestones} futureVision={futureVision} />
    </DashboardShell>
  );
};

export default JourneyPage;
