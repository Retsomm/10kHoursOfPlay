import { completedTierCount, getChapterProgress, isChapterComplete, type ProgressMap } from "./progress";

export interface SixStepDef {
  step: number;
  label: string;
  chapterIds: string[];
}

// 書中六步驟（選遊戲→認天賦→選角色→練技能→建盟友→達任務），
// Ch1（英雄旅程開場）跟 Ch9（全面對齊自評）是整段旅程的起點與終點檢核，
// 不算在六步驟本身裡面。
export const SIX_STEPS: SixStepDef[] = [
  { step: 1, label: "選擇使命", chapterIds: ["ch2"] },
  { step: 2, label: "認識天賦", chapterIds: ["ch3-1", "ch3-2"] },
  { step: 3, label: "選擇角色", chapterIds: ["ch4-1", "ch4-2"] },
  { step: 4, label: "提升技能", chapterIds: ["ch5-1", "ch5-2"] },
  { step: 5, label: "建立聯盟", chapterIds: ["ch6", "ch7"] },
  { step: 6, label: "達成任務", chapterIds: ["ch8"] },
];

export interface SixStepChapterProgress {
  chapterId: string;
  /** 這個章節簡單/中等/困難各自完成了幾個（0～3），純粹顯示用 */
  done: number;
  /** 章節只要完成任一難度就算通關（見 progress.ts 的 isChapterComplete） */
  complete: boolean;
}

export interface SixStepProgress extends SixStepDef {
  /** 這一步裡有幾個章節已經通關（不是關卡數） */
  done: number;
  /** 這一步總共有幾個章節 */
  total: number;
  /** 每個章節各自的完成度，不合併成單一分數，避免混淆 */
  chapters: SixStepChapterProgress[];
}

export const computeSixStepProgress = (progressMap: ProgressMap): SixStepProgress[] => {
  return SIX_STEPS.map((step) => {
    const chapters = step.chapterIds.map((chapterId) => {
      const progress = getChapterProgress(progressMap, chapterId);
      return {
        chapterId,
        done: completedTierCount(progress),
        complete: isChapterComplete(progress),
      };
    });
    return {
      ...step,
      done: chapters.filter((c) => c.complete).length,
      total: step.chapterIds.length,
      chapters,
    };
  });
};
