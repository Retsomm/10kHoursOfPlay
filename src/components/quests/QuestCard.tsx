"use client";

import { useState, useTransition } from "react";
import {
  QUEST_SCOPE_LABEL,
  QUEST_STATUS_LABEL,
  QUEST_TYPE_LABEL,
  cooldownDaysRemaining,
  isCooldownActive,
  isQuestOverdue,
  type Quest,
} from "@/lib/quests";
import { abandonQuest, deleteQuest, reportQuestOutcome, restartQuest, updateQuest } from "@/app/quests/actions";
import StarRating from "@/components/StarRating";
import QuestFields, { type QuestFieldsValue } from "@/components/quests/QuestFields";

const formatDueDate = (dueDate: string) =>
  new Date(dueDate).toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });

const toFieldsValue = (quest: Quest): QuestFieldsValue => ({
  title: quest.title,
  scope: quest.scope,
  questType: quest.quest_type ?? "",
  star1: quest.star1_criteria ?? "",
  star2: quest.star2_criteria ?? "",
  star3: quest.star3_criteria ?? "",
  dueDate: quest.due_date ?? "",
  reward: quest.reward ?? "",
});

const QuestCard = ({ quest }: { quest: Quest }) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState<QuestFieldsValue>(() => toFieldsValue(quest));
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleReport = (stars: 0 | 1 | 2 | 3) => {
    startTransition(async () => {
      await reportQuestOutcome(quest.id, stars);
    });
  };

  const handleRestart = () => {
    startTransition(async () => {
      await restartQuest(quest.id);
    });
  };

  const handleAbandon = () => {
    startTransition(async () => {
      await abandonQuest(quest.id);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteQuest(quest.id);
    });
  };

  const startEditing = () => {
    setEditValue(toFieldsValue(quest));
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editValue.title.trim()) return;
    startTransition(async () => {
      await updateQuest(quest.id, {
        title: editValue.title,
        scope: editValue.scope,
        questType: editValue.questType || undefined,
        star1Criteria: editValue.star1 || undefined,
        star2Criteria: editValue.star2 || undefined,
        star3Criteria: editValue.star3 || undefined,
        reward: editValue.reward || undefined,
        dueDate: editValue.dueDate || undefined,
      });
      setIsEditing(false);
    });
  };

  const cooldownActive = isCooldownActive(quest);
  const overdue = isQuestOverdue(quest);

  if (isEditing) {
    return (
      <div className="panel p-5 min-w-0 space-y-4">
        <p className="font-display text-sm text-dim tracking-widest">編輯任務</p>
        <QuestFields value={editValue} onChange={(p) => setEditValue((v) => ({ ...v, ...p }))} showSmartIntro={false} />
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            disabled={isPending || !editValue.title.trim()}
            onClick={handleSaveEdit}
            className="btn-primary rounded-lg px-4 py-2 text-sm"
          >
            儲存
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="btn-secondary rounded-lg px-4 py-2 text-sm"
          >
            取消
          </button>
          {isPending && <span className="text-sm text-dim">處理中…</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={`panel p-5 min-w-0 space-y-3 ${quest.status === "completed" ? "panel-glow" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-bold break-words">{quest.title}</h3>
          <p className="text-sm text-dim mt-0.5">
            {QUEST_SCOPE_LABEL[quest.scope]}
            {quest.quest_type ? ` · ${QUEST_TYPE_LABEL[quest.quest_type] ?? quest.quest_type}` : ""}
          </p>
        </div>
        <span className="text-sm px-2 py-1 rounded-full border border-[var(--color-border-bright)] text-dim shrink-0 whitespace-nowrap">
          {QUEST_STATUS_LABEL[quest.status]}
        </span>
      </div>

      {(quest.star1_criteria || quest.star2_criteria || quest.star3_criteria) && (
        <div className="text-sm text-dim space-y-1 break-words">
          {quest.star1_criteria && <p>★ {quest.star1_criteria}</p>}
          {quest.star2_criteria && <p>★★ {quest.star2_criteria}</p>}
          {quest.star3_criteria && <p>★★★ {quest.star3_criteria}</p>}
        </div>
      )}

      {quest.due_date && (
        <p className="text-sm break-words" style={{ color: overdue ? "var(--color-danger)" : "var(--color-text-dim)" }}>
          時限：{formatDueDate(quest.due_date)}
          {overdue ? "（已逾期）" : ""}
        </p>
      )}

      {quest.reward && <p className="text-sm text-dim break-words">獎勵：{quest.reward}</p>}

      {quest.status === "active" && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-sm text-dim">回報結果：</span>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              disabled={isPending}
              onClick={() => handleReport(n as 1 | 2 | 3)}
              className="text-sm px-2 py-1 rounded border border-[var(--color-border-bright)] hover:bg-white/5 disabled:opacity-50"
            >
              {n}★
            </button>
          ))}
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleReport(0)}
            className="text-sm px-2 py-1 rounded border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-white/5 disabled:opacity-50"
          >
            0★ 失敗
          </button>
        </div>
      )}

      {quest.status === "completed" && (
        <div className="pt-2">
          <StarRating filled={quest.current_stars} total={3} />
        </div>
      )}

      {quest.status === "cooldown" && (
        <div className="pt-2 space-y-2">
          <p className="text-sm" style={{ color: "var(--color-danger)" }}>
            {cooldownActive
              ? `冷卻中，還有 ${cooldownDaysRemaining(quest.cooldown_until!)} 天可以重新挑戰`
              : "冷卻期已過，可以重新開始"}
          </p>
          {!cooldownActive && (
            <button
              type="button"
              disabled={isPending}
              onClick={handleRestart}
              className="btn-primary rounded-lg text-sm px-3 py-1.5"
            >
              重新開始
            </button>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button type="button" onClick={startEditing} className="text-sm text-dim hover:text-[var(--color-accent)]">
          編輯
        </button>
        {quest.status === "active" && (
          <button
            type="button"
            disabled={isPending}
            onClick={handleAbandon}
            className="text-sm text-dim hover:text-[var(--color-danger)]"
          >
            放棄這個任務
          </button>
        )}
        {confirmingDelete ? (
          <span className="text-sm flex items-center gap-2">
            確定要刪除嗎？
            <button
              type="button"
              disabled={isPending}
              onClick={handleDelete}
              className="text-[var(--color-danger)] hover:underline"
            >
              確定刪除
            </button>
            <button type="button" onClick={() => setConfirmingDelete(false)} className="text-dim hover:underline">
              取消
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="text-sm text-dim hover:text-[var(--color-danger)]"
          >
            刪除
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestCard;
