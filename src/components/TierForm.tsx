"use client";

import { useState, useTransition } from "react";
import type { Tier, TierContent } from "@/types/content";
import { TIER_LABEL, TIER_STARS } from "@/types/content";
import FieldRenderer from "./fields/FieldRenderer";
import StarRating from "./StarRating";
import { saveDraft, submitTier } from "@/app/chapters/[chapterId]/actions";

const TierForm = ({
  chapterId,
  tier,
  content,
  initialValues,
  completed,
}: {
  chapterId: string;
  tier: Tier;
  content: TierContent;
  initialValues: Record<string, unknown>;
  completed: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "completed">("idle");

  const setField = (key: string, next: unknown) => {
    setValues((prev) => ({ ...prev, [key]: next }));
    setStatus("idle");
  };

  const handleSaveDraft = () => {
    startTransition(async () => {
      await saveDraft(chapterId, tier, values);
      setStatus("saved");
    });
  };

  const handleComplete = () => {
    startTransition(async () => {
      await submitTier(chapterId, tier, values);
      setStatus("completed");
    });
  };

  return (
    <div className={`panel ${expanded ? "p-6" : "p-4"} space-y-6`}>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="font-display text-sm text-dim">{TIER_LABEL[tier]}</span>
          <StarRating filled={TIER_STARS[tier]} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {completed && (
            <span className="text-sm px-2 py-1 rounded-full border border-[var(--color-success)] text-[var(--color-success)] shadow-[0_0_14px_-4px_rgba(52,211,153,0.7)]">
              已完成
            </span>
          )}
          <span className="font-display text-sm text-dim">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>

      {expanded && (
        <>
          {content.intro && <p className="text-sm text-dim leading-relaxed">{content.intro}</p>}

          {content.dashboardHint && (
            <p className="text-sm star leading-relaxed">✦ {content.dashboardHint}</p>
          )}

          <div className="space-y-5">
            {content.fields.map((field) => (
              <FieldRenderer
                key={field.key}
                field={field}
                value={values[field.key]}
                onChange={(next) => setField(field.key, next)}
              />
            ))}
          </div>

          {content.takeaway && (
            <div className="rounded-lg border border-[var(--color-border-bright)] bg-black/20 p-4 text-sm text-dim">
              <p className="font-display text-sm star mb-1">這樣做對你有什麼幫助？</p>
              {content.takeaway}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              disabled={isPending}
              onClick={handleSaveDraft}
              className="btn-secondary rounded-lg px-4 py-2 text-sm"
            >
              儲存草稿
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={handleComplete}
              className="btn-primary rounded-lg px-4 py-2 text-sm"
            >
              {completed ? "更新並保持完成" : "完成這一關"}
            </button>
            {status === "saved" && <span className="text-sm text-dim">已儲存草稿</span>}
            {status === "completed" && (
              <span className="text-sm text-[var(--color-success)]">已完成！</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TierForm;
