"use client";

import { useTransition } from "react";
import {
  QUEST_SCOPE_LABEL,
  QUEST_STATUS_LABEL,
  QUEST_TYPE_LABEL,
  cooldownDaysRemaining,
  isCooldownActive,
  type Quest,
} from "@/lib/quests";
import { abandonQuest, reportQuestOutcome, restartQuest } from "@/app/quests/actions";
import StarRating from "@/components/StarRating";

const QuestCard = ({ quest }: { quest: Quest }) => {
  const [isPending, startTransition] = useTransition();

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

  const cooldownActive = isCooldownActive(quest);

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
    </div>
  );
};

export default QuestCard;
