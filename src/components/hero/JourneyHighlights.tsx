import Link from "next/link";
import type { FutureVision } from "@/lib/heroStatus";

const JourneyHighlights = ({
  milestones,
  futureVision,
}: {
  milestones: string[];
  futureVision: FutureVision;
}) => {
  if (milestones.length === 0 && futureVision.fiveYearGoals.length === 0) return null;

  return (
    <div className="panel p-5 min-w-0 space-y-4">
      <p className="font-display text-sm text-dim tracking-widest">過去與未來</p>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]">
        {milestones.length > 0 && (
          <div className="min-w-0">
            <p className="text-sm font-display" style={{ color: "var(--color-gold)" }}>
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
            <p className="text-sm font-display" style={{ color: "var(--color-accent)" }}>
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
      <p className="text-sm text-dim">
        想把這些目標變成可以持續追蹤、有星星門檻的任務？
        <Link href="/quests" className="text-[var(--color-accent)] hover:underline">
          前往任務追蹤器 →
        </Link>
      </p>
    </div>
  );
};

export default JourneyHighlights;
