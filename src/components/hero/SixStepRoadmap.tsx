import Link from "next/link";
import type { SixStepProgress } from "@/lib/sixSteps";

const SixStepRoadmap = ({ steps }: { steps: SixStepProgress[] }) => {
  return (
    <div className="panel p-5 min-w-0 space-y-4">
      <p className="font-display text-sm text-dim tracking-widest">六步驟旅程</p>
      <div className="flex flex-wrap gap-3">
        {steps.map((step) => {
          const complete = step.done === step.total;
          const started = step.done > 0;
          const pct = step.total > 0 ? (step.done / step.total) * 100 : 0;
          return (
            <Link
              key={step.step}
              href={`/chapters/${step.chapterIds[0]}`}
              className={`flex-1 min-w-[120px] rounded-lg border px-3 py-3 text-center transition hover:panel-glow space-y-1.5 ${
                complete
                  ? "border-[var(--color-success)] shadow-[0_0_16px_-4px_rgba(52,211,153,0.6)]"
                  : started
                    ? "border-[var(--color-border-bright)]"
                    : "border-[var(--color-border)] opacity-70"
              }`}
            >
              <p className="font-pixel text-[9px] text-dim">STEP {step.step}</p>
              <p className="font-bold">{step.label}</p>
              <p className={`text-sm font-tech ${complete ? "text-[var(--color-success)]" : "text-dim"}`}>
                {step.done} / {step.total}
              </p>
              <div className="xp-track h-1">
                <div
                  className="xp-fill"
                  style={{
                    width: `${pct}%`,
                    background: complete ? "var(--color-success)" : undefined,
                    boxShadow: complete ? "0 0 10px rgba(52,211,153,0.8)" : undefined,
                  }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SixStepRoadmap;
