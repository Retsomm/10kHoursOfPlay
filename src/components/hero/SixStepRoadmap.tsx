import Link from "next/link";
import { CHAPTER_SHORT_LABEL } from "@/data/chapters";
import type { SixStepProgress } from "@/lib/sixSteps";

const SixStepRoadmap = ({ steps }: { steps: SixStepProgress[] }) => {
  return (
    <div className="panel p-5 min-w-0 space-y-4">
      <p className="font-display text-sm text-dim tracking-widest">六步驟旅程</p>
      <div className="flex flex-wrap gap-3">
        {steps.map((step) => {
          const complete = step.done === step.total;
          const started = step.done > 0;
          return (
            <div
              key={step.step}
              className={`flex-1 min-w-[140px] rounded-lg border px-3 py-3 text-center space-y-2 ${
                complete
                  ? "border-[var(--color-success)] shadow-[0_0_16px_-4px_rgba(52,211,153,0.6)]"
                  : started
                    ? "border-[var(--color-border-bright)]"
                    : "border-[var(--color-border)] opacity-70"
              }`}
            >
              <div>
                <p className="font-pixel text-[9px] text-dim">STEP {step.step}</p>
                <p className="font-bold">{step.label}</p>
              </div>
              {/* 每個章節各自的完成度分開顯示、各自可以點擊——
                  一步裡有兩個章節時（例如天賦/領導風格），兩個都要能直接點進去看，
                  不要整張卡片只連去其中一個章節。 */}
              <div className="space-y-1">
                {step.chapters.map((c) => (
                  <Link
                    key={c.chapterId}
                    href={`/chapters/${c.chapterId}`}
                    className="flex items-center justify-between gap-2 text-sm rounded px-1 -mx-1 transition hover:bg-white/5"
                  >
                    <span className={c.complete ? "text-[var(--color-success)]" : "text-dim"}>
                      {CHAPTER_SHORT_LABEL[c.chapterId] ?? c.chapterId}
                    </span>
                    <span className="flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-sm border"
                          style={{
                            background: i < c.done ? "var(--color-success)" : "transparent",
                            borderColor: i < c.done ? "var(--color-success)" : "var(--color-border-bright)",
                          }}
                        />
                      ))}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SixStepRoadmap;
