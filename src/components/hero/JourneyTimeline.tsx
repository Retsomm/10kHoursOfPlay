import type { FutureVision, JourneyEvent } from "@/lib/heroStatus";
import { TIER_LABEL } from "@/types/content";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" });

const JourneyTimeline = ({
  events,
  chapterTitles,
  milestones,
  futureVision,
}: {
  events: JourneyEvent[];
  chapterTitles: Record<string, string>;
  milestones: string[];
  futureVision: FutureVision;
}) => {
  return (
    <div className="panel p-5 space-y-6">
      <p className="font-display text-xs text-dim tracking-widest">人生旅程時間軸</p>

      {events.length === 0 ? (
        <p className="text-sm text-dim">完成第一個關卡後，這裡會開始記錄你的旅程。</p>
      ) : (
        <div className="sm:overflow-x-auto sm:pb-2">
          <div className="relative flex flex-col gap-3 sm:flex-row sm:gap-6 sm:min-w-max">
            <span
              aria-hidden="true"
              className="absolute left-[5px] top-0 bottom-0 w-px sm:hidden"
              style={{ background: "var(--color-border-bright)" }}
            />
            <span
              aria-hidden="true"
              className="hidden sm:block absolute top-[5px] h-px left-14 right-14"
              style={{ background: "var(--color-border-bright)" }}
            />
            {events.map((event) => (
              <div
                key={`${event.chapterId}-${event.tier}`}
                className="relative flex items-center gap-3 sm:flex-col sm:items-center sm:gap-1 sm:w-28 sm:shrink-0 sm:text-center"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: "var(--color-accent)" }}
                />
                <span className="text-xs text-dim shrink-0">{formatDate(event.completedAt)}</span>
                <span className="text-xs break-words">{chapterTitles[event.chapterId] ?? event.chapterId}</span>
                <span className="text-[10px] text-dim shrink-0">{TIER_LABEL[event.tier]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(milestones.length > 0 || futureVision.fiveYearGoals.length > 0) && (
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]">
          {milestones.length > 0 && (
            <div className="min-w-0">
              <p className="text-xs font-display" style={{ color: "var(--color-gold)" }}>
                過去的里程碑
              </p>
              <ul className="mt-1 space-y-1 text-sm text-dim break-words list-disc list-inside">
                {milestones.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {futureVision.fiveYearGoals.length > 0 && (
            <div className="min-w-0">
              <p className="text-xs font-display" style={{ color: "var(--color-accent)" }}>
                五年目標
              </p>
              <ul className="mt-1 space-y-1 text-sm text-dim break-words list-disc list-inside">
                {futureVision.fiveYearGoals.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JourneyTimeline;
