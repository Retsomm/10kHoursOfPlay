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
}

export interface ListField {
  type: "list";
  key: string;
  label: string;
  itemCount: number;
  itemLabels?: string[];
}

export interface TableField {
  type: "table";
  key: string;
  label: string;
  columns: { key: string; label: string }[];
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
