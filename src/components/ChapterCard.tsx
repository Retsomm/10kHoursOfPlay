import Link from "next/link";
import type { ChapterContent } from "@/types/content";
import { TIERS, TIER_LABEL } from "@/types/content";
import type { ChapterProgress } from "@/lib/progress";
import { isTierCompleted, isChapterComplete } from "@/lib/progress";

const ChapterCard = ({
  chapter,
  progress,
}: {
  chapter: ChapterContent;
  progress: ChapterProgress;
}) => {
  const complete = isChapterComplete(progress);

  return (
    <Link
      href={`/chapters/${chapter.id}`}
      className={`panel block p-5 transition hover:panel-glow ${complete ? "panel-glow" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-lg font-bold break-words">{chapter.title}</h3>
          <p className="text-sm text-dim mt-0.5">{chapter.subtitle}</p>
        </div>
        {complete && (
          <span className="shrink-0 whitespace-nowrap text-sm px-2 py-1 rounded-full border border-[var(--color-gold)] star font-display glow-gold shadow-[0_0_16px_-4px_rgba(251,191,36,0.7)]">
            已通關
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        {TIERS.map((tier) => {
          const completed = isTierCompleted(progress, tier);
          return (
            <div
              key={tier}
              className={`flex-1 rounded-lg border px-3 py-2 text-center text-sm transition ${
                completed
                  ? "border-[var(--color-success)] text-[var(--color-success)] shadow-[0_0_14px_-4px_rgba(52,211,153,0.7)]"
                  : "border-[var(--color-border-bright)] text-dim"
              }`}
            >
              {TIER_LABEL[tier]}
            </div>
          );
        })}
      </div>
    </Link>
  );
};

export default ChapterCard;
