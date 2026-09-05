export type Tier = "easy" | "medium" | "hard";

export const TIERS: Tier[] = ["easy", "medium", "hard"];

export const TIER_LABEL: Record<Tier, string> = {
  easy: "簡單",
  medium: "中等",
  hard: "困難",
};

export const TIER_STARS: Record<Tier, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export type FieldType = "textarea" | "list" | "table" | "rating" | "classRating" | "contactList";

export interface TextareaField {
  type: "textarea";
  key: string;
  label: string;
  /** 填寫範例，顯示成輸入框的 placeholder（開始打字就會消失） */
  placeholder?: string;
}

export interface ListField {
  type: "list";
  key: string;
  label: string;
  itemCount: number;
  itemLabels?: string[];
  /** 預設選項：使用者輸入時可從這份清單挑選，但仍可自由輸入其他文字 */
  suggestions?: string[];
}

export interface TableField {
  type: "table";
  key: string;
  label: string;
  columns: { key: string; label: string; placeholder?: string }[];
  rowCount: number;
  rowLabels?: string[];
}

export interface RatingField {
  type: "rating";
  key: string;
  label: string;
  max?: number;
}

export interface ClassRatingField {
  type: "classRating";
  key: string;
  label: string;
  classes: { key: string; label: string }[];
}

export interface ContactListField {
  type: "contactList";
  key: string;
  label: string;
  itemCount: number;
  relationshipOptions: { key: string; label: string }[];
}

export type Field =
  | TextareaField
  | ListField
  | TableField
  | RatingField
  | ClassRatingField
  | ContactListField;

export interface TierContent {
  intro?: string;
  fields: Field[];
  takeaway?: string;
  /**
   * 章節只要完成任一難度就算通關，但英雄狀態儀表板的部分圖表（金字塔／雷達圖／
   * 名冊）是讀取特定難度的答案。這個難度若是圖表資料來源，在這裡註明提示文字，
   * 顯示在填答表單上，讓使用者知道「想在總覽看到那個圖表，要填這一關」。
   */
  dashboardHint?: string;
}

export type Phase = "I" | "II";

export const PHASE_LABEL: Record<Phase, string> = {
  I: "PHASE I · KNOW YOURSELF",
  II: "PHASE II · GROW YOURSELF",
};

export interface ChapterContent {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  phase: Phase;
  tiers: Record<Tier, TierContent>;
}
