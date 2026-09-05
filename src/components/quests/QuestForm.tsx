"use client";

import { useState, useTransition } from "react";
import { createQuest } from "@/app/quests/actions";
import QuestFields, { EMPTY_QUEST_FIELDS, type QuestFieldsValue } from "@/components/quests/QuestFields";

const QuestForm = ({ prefill }: { prefill: { title: string; reward: string } }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<QuestFieldsValue>(EMPTY_QUEST_FIELDS);
  const [isPending, startTransition] = useTransition();

  const patch = (p: Partial<QuestFieldsValue>) => setValue((v) => ({ ...v, ...p }));

  const applyPrefill = () => {
    patch({ title: prefill.title, reward: prefill.reward });
  };

  const handleSubmit = () => {
    if (!value.title.trim()) return;
    startTransition(async () => {
      await createQuest({
        title: value.title,
        scope: value.scope,
        questType: value.questType || undefined,
        star1Criteria: value.star1 || undefined,
        star2Criteria: value.star2 || undefined,
        star3Criteria: value.star3 || undefined,
        reward: value.reward || undefined,
        sourceChapterId: "ch8",
        dueDate: value.dueDate || undefined,
      });
      setValue(EMPTY_QUEST_FIELDS);
      setOpen(false);
    });
  };

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn-primary rounded-lg px-4 py-2 text-sm">
        + 新增任務
      </button>
    );
  }

  return (
    <div className="panel p-5 min-w-0 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-sm text-dim tracking-widest">新增任務</p>
        {(prefill.title || prefill.reward) && (
          <button
            type="button"
            onClick={applyPrefill}
            className="text-sm text-[var(--color-accent)] hover:underline shrink-0"
          >
帶入先前設定的次要任務目標
          </button>
        )}
      </div>

      <QuestFields value={value} onChange={patch} />

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          disabled={isPending || !value.title.trim()}
          onClick={handleSubmit}
          className="btn-primary rounded-lg px-4 py-2 text-sm"
        >
          建立任務
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="btn-secondary rounded-lg px-4 py-2 text-sm"
        >
          取消
        </button>
        {isPending && <span className="text-sm text-dim">處理中…</span>}
      </div>
    </div>
  );
};

export default QuestForm;
