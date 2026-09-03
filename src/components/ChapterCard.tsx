import Link from "next/link";
import type { ChapterContent } from "@/types/content";
import { TIERS, TIER_LABEL } from "@/types/content";
import type { ChapterProgress } from "@/lib/progress";
import { isTierCompleted, isTierUnlocked, completedTierCount } from "@/lib/progress";
import LockIcon from "./LockIcon";

export default function ChapterCard({
  chapter,
  progress,
}: {
  chapter: ChapterContent;
  progress: ChapterProgress;
}) {
  const done = completedTierCount(progress);
  const fullyComplete = done === 3;

  return (
    <Link
      href={`/chapters/${chapter.id}`}
      className={`panel block p-5 transition hover:panel-glow ${fullyComplete ? "panel-glow" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-dim font-display">{chapter.number}</p>
          <h3 className="text-lg font-bold mt-1">{chapter.title}</h3>
          <p className="text-xs text-dim mt-0.5">{chapter.subtitle}</p>
        </div>
        {fullyComplete && (
          <span className="text-xs px-2 py-1 rounded-full border border-[var(--color-gold)] star font-display">
            已通關
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        {TIERS.map((tier) => {
          const unlocked = isTierUnlocked(progress, tier);
          const completed = isTierCompleted(progress, tier);
          return (
            <div
              key={tier}
              className={`flex-1 rounded-lg border px-3 py-2 text-center text-xs ${
                completed
                  ? "border-[var(--color-success)] text-[var(--color-success)]"
                  : unlocked
                    ? "border-[var(--color-border-bright)] text-dim"
                    : "border-[var(--color-border)] text-dim opacity-50"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                {!unlocked && <LockIcon className="w-3 h-3" />}
                {TIER_LABEL[tier]}
              </div>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
