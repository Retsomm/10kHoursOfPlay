"use client";

import { useState, useTransition } from "react";
import type { Tier, TierContent } from "@/types/content";
import { TIER_LABEL, TIER_STARS } from "@/types/content";
import FieldRenderer from "./fields/FieldRenderer";
import StarRating from "./StarRating";
import { saveDraft, submitTier } from "@/app/chapters/[chapterId]/actions";

export default function TierForm({
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
}) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "completed">("idle");

  function setField(key: string, next: unknown) {
    setValues((prev) => ({ ...prev, [key]: next }));
    setStatus("idle");
  }

  function handleSaveDraft() {
    startTransition(async () => {
      await saveDraft(chapterId, tier, values);
      setStatus("saved");
    });
  }

  function handleComplete() {
    startTransition(async () => {
      await submitTier(chapterId, tier, values);
      setStatus("completed");
    });
  }

  return (
    <div className="panel p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm text-dim">{TIER_LABEL[tier]}</span>
          <StarRating filled={TIER_STARS[tier]} />
        </div>
        {completed && (
          <span className="text-xs px-2 py-1 rounded-full border border-[var(--color-success)] text-[var(--color-success)]">
            已完成
          </span>
        )}
      </div>

      {content.intro && <p className="text-sm text-dim leading-relaxed">{content.intro}</p>}

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
          <p className="font-display text-xs star mb-1">這樣做對你有什麼幫助？</p>
          {content.takeaway}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          disabled={isPending}
          onClick={handleSaveDraft}
          className="px-4 py-2 rounded-lg border border-[var(--color-border-bright)] text-sm hover:bg-white/5 disabled:opacity-50"
        >
          儲存草稿
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={handleComplete}
          className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[#04121f] font-bold text-sm hover:brightness-110 disabled:opacity-50"
        >
          {completed ? "更新並保持完成" : "完成並解鎖下一關"}
        </button>
        {status === "saved" && <span className="text-xs text-dim">已儲存草稿</span>}
        {status === "completed" && (
          <span className="text-xs text-[var(--color-success)]">已完成！</span>
        )}
      </div>
    </div>
  );
}
