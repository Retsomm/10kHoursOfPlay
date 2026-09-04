"use client";

import { useState, useTransition } from "react";
import { createQuest } from "@/app/quests/actions";
import { QUEST_TYPE_OPTIONS, type QuestScope } from "@/lib/quests";

const QuestForm = ({ prefill }: { prefill: { title: string; reward: string } }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [scope, setScope] = useState<QuestScope>("task");
  const [questType, setQuestType] = useState("");
  const [star1, setStar1] = useState("");
  const [star2, setStar2] = useState("");
  const [star3, setStar3] = useState("");
  const [reward, setReward] = useState("");
  const [isPending, startTransition] = useTransition();

  const applyPrefill = () => {
    setTitle(prefill.title);
    setReward(prefill.reward);
  };

  const resetForm = () => {
    setTitle("");
    setScope("task");
    setQuestType("");
    setStar1("");
    setStar2("");
    setStar3("");
    setReward("");
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    startTransition(async () => {
      await createQuest({
        title,
        scope,
        questType: questType || undefined,
        star1Criteria: star1 || undefined,
        star2Criteria: star2 || undefined,
        star3Criteria: star3 || undefined,
        reward: reward || undefined,
        sourceChapterId: "ch8",
      });
      resetForm();
      setOpen(false);
    });
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[#04121f] font-bold text-sm hover:brightness-110"
      >
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

      <div className="space-y-2">
        <label className="block text-sm font-medium">任務名稱</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例如：完成一份完整的產品提案"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium">範疇</label>
          <select value={scope} onChange={(e) => setScope(e.target.value as QuestScope)}>
            <option value="task">任務 Task</option>
            <option value="minor_quest">次要任務 Minor Quest</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">類型（選填）</label>
          <select value={questType} onChange={(e) => setQuestType(e.target.value)}>
            <option value="">不指定</option>
            {QUEST_TYPE_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">1 星門檻（選填）</label>
        <textarea rows={2} value={star1} onChange={(e) => setStar1(e.target.value)} placeholder="做到什麼程度算 1 星？" />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">2 星門檻（選填）</label>
        <textarea rows={2} value={star2} onChange={(e) => setStar2(e.target.value)} placeholder="做到什麼程度算 2 星？" />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">3 星門檻（選填）</label>
        <textarea rows={2} value={star3} onChange={(e) => setStar3(e.target.value)} placeholder="做到什麼程度算 3 星？" />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">獎勵（選填）</label>
        <input value={reward} onChange={(e) => setReward(e.target.value)} placeholder="達成後要給自己什麼獎勵？" />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          disabled={isPending || !title.trim()}
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[#04121f] font-bold text-sm hover:brightness-110 disabled:opacity-50"
        >
          建立任務
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-lg border border-[var(--color-border-bright)] text-sm hover:bg-white/5"
        >
          取消
        </button>
        {isPending && <span className="text-sm text-dim">處理中…</span>}
      </div>
    </div>
  );
};

export default QuestForm;
