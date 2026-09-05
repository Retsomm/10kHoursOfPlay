import { totalCompletedTiers, type ProgressMap } from "./progress";

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

export interface SixStepProgress extends SixStepDef {
  done: number;
  total: number;
}

export const computeSixStepProgress = (progressMap: ProgressMap): SixStepProgress[] => {
  return SIX_STEPS.map((step) => ({
    ...step,
    done: totalCompletedTiers(progressMap, step.chapterIds),
    total: step.chapterIds.length * 3,
  }));
};
