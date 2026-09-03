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

export type FieldType = "textarea" | "list" | "table";

export interface TextareaField {
  type: "textarea";
  key: string;
  label: string;
}

export interface ListField {
  type: "list";
  key: string;
  label: string;
  itemCount: number;
  itemLabel?: (index: number) => string;
}

export interface TableField {
  type: "table";
  key: string;
  label: string;
  columns: { key: string; label: string }[];
  rowCount: number;
  rowLabel?: (index: number) => string;
}

export type Field = TextareaField | ListField | TableField;

export interface TierContent {
  intro?: string;
  fields: Field[];
  takeaway?: string;
}

export interface ChapterContent {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tiers: Record<Tier, TierContent>;
}
