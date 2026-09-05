export type QuestScope = "task" | "minor_quest";
export type QuestStatus = "active" | "completed" | "cooldown" | "abandoned";

// Supabase/PostgREST reports a missing table via Postgres' 42P01 or PostgREST's
// own PGRST205 ("...not found in the schema cache"), depending on version —
// check both, plus the message text, so we only treat *this specific* failure
// as "migration not run yet" and let every other error (permissions, network,
// etc.) surface normally instead of being silently swallowed.
export const isMissingQuestsTableError = (error: { code?: string; message?: string } | null): boolean => {
  if (!error) return false;
  const message = error.message ?? "";
  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    /schema cache/i.test(message) ||
    /relation .* does not exist/i.test(message)
  );
};

export const QUEST_SCOPE_LABEL: Record<QuestScope, string> = {
  task: "任務 Task",
  minor_quest: "次要任務 Minor Quest",
};

export const QUEST_STATUS_LABEL: Record<QuestStatus, string> = {
  active: "進行中",
  completed: "已完成",
  cooldown: "冷卻中",
  abandoned: "已放棄",
};

export const QUEST_TYPE_OPTIONS: { key: string; label: string }[] = [
  { key: "career", label: "職涯 Career" },
  { key: "learning", label: "學習 Learning" },
  { key: "resource", label: "資源 Resource" },
  { key: "health", label: "健康 Health" },
  { key: "spiritual", label: "心靈 Spiritual" },
  { key: "relationship", label: "關係 Relationship" },
  { key: "alliance", label: "聯盟 Alliance" },
  { key: "discovery", label: "探索 Discovery" },
  { key: "service", label: "服務 Service" },
  { key: "adventure", label: "冒險 Adventure" },
];

export const QUEST_TYPE_LABEL: Record<string, string> = Object.fromEntries(
  QUEST_TYPE_OPTIONS.map((opt) => [opt.key, opt.label]),
);

export interface Quest {
  id: string;
  user_id: string;
  title: string;
  scope: QuestScope;
  quest_type: string | null;
  star1_criteria: string | null;
  star2_criteria: string | null;
  star3_criteria: string | null;
  current_stars: number;
  reward: string | null;
  status: QuestStatus;
  cooldown_until: string | null;
  source_chapter_id: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export const isQuestOverdue = (quest: Pick<Quest, "status" | "due_date">): boolean => {
  if (quest.status !== "active" || !quest.due_date) return false;
  return new Date(quest.due_date).getTime() < new Date().setHours(0, 0, 0, 0);
};

const COOLDOWN_DAYS = 14;

export const computeCooldownUntil = (from: Date = new Date()): string => {
  const d = new Date(from);
  d.setDate(d.getDate() + COOLDOWN_DAYS);
  return d.toISOString();
};

export const isCooldownActive = (quest: Pick<Quest, "status" | "cooldown_until">): boolean => {
  if (quest.status !== "cooldown" || !quest.cooldown_until) return false;
  return new Date(quest.cooldown_until).getTime() > Date.now();
};

export const cooldownDaysRemaining = (cooldownUntil: string): number => {
  const ms = new Date(cooldownUntil).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
};

export interface QuestCounts {
  active: number;
  completed: number;
  cooldown: number;
  total: number;
}

export const computeQuestCounts = (quests: Pick<Quest, "status">[]): QuestCounts => {
  const counts: QuestCounts = { active: 0, completed: 0, cooldown: 0, total: quests.length };
  for (const q of quests) {
    if (q.status === "active") counts.active += 1;
    else if (q.status === "completed") counts.completed += 1;
    else if (q.status === "cooldown") counts.cooldown += 1;
  }
  return counts;
};
