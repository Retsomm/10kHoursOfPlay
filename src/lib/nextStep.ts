import { getChapterProgress, isChapterComplete, type ProgressMap } from "./progress";
import type { SixStepProgress } from "./sixSteps";
import type { QuestCounts } from "./quests";

export interface NextStepSuggestion {
  message: string;
  href: string;
  cta: string;
}

export const computeNextStep = (
  progressMap: ProgressMap,
  sixSteps: SixStepProgress[],
  ch9Complete: boolean,
  questCounts: QuestCounts,
): NextStepSuggestion => {
  const nextStep = sixSteps.find((s) => s.done < s.total);
  if (nextStep) {
    const targetChapter =
      nextStep.chapterIds.find((id) => !isChapterComplete(getChapterProgress(progressMap, id))) ??
      nextStep.chapterIds[0];
    return {
      message: `你正走在「${nextStep.label}」這一步，已完成 ${nextStep.done}/${nextStep.total} 章節。`,
      href: `/chapters/${targetChapter}`,
      cta: "繼續填答 →",
    };
  }

  if (!ch9Complete) {
    return {
      message: "六步驟都完成了！接下來檢視整體是否對齊，邁向 OP 模式。",
      href: "/chapters/ch9",
      cta: "前往「全面對齊」→",
    };
  }

  if (questCounts.active > 0) {
    return {
      message: `你有 ${questCounts.active} 個進行中的任務，持續追蹤下去。`,
      href: "/quests",
      cta: "查看任務追蹤器 →",
    };
  }

  if (questCounts.cooldown > 0) {
    return {
      message: "有任務還在冷卻中，先休息一下，或建立新的任務挑戰自己。",
      href: "/quests",
      cta: "查看任務追蹤器 →",
    };
  }

  return {
    message: "六步驟與全面對齊都已完成，你已經站上 OP Hero 的位置。建立新任務，持續玩下去。",
    href: "/quests",
    cta: "建立新任務 →",
  };
};
