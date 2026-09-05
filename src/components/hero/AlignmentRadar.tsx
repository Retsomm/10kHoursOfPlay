import Link from "next/link";
import type { RadarAxis } from "@/lib/heroStatus";
import RadarChart from "./RadarChart";

const LOW_SCORE_THRESHOLD = 3;

const AlignmentRadar = ({ axes, chapterHref }: { axes: RadarAxis[]; chapterHref: string }) => {
  const hasData = axes.some((a) => a.value > 0);
  const average = axes.reduce((sum, a) => sum + a.value, 0) / axes.length;
  const isLow = hasData && average < LOW_SCORE_THRESHOLD;

  return (
    <div className="panel p-5 min-w-0">
      <RadarChart title="六步驟對齊" axes={axes} max={5} color="var(--color-accent)" />
      {!hasData && (
        <p className="text-sm text-dim text-center mt-2">
          <Link href={chapterHref} className="text-[var(--color-accent)] hover:underline">
            前往「全面對齊」自評打分 →
          </Link>
        </p>
      )}
      {isLow && (
        <p className="text-sm text-dim text-center mt-2">
          平均分數偏低，
          <Link href={chapterHref} className="text-[var(--color-accent)] hover:underline">
            回去補強六步驟 →
          </Link>
        </p>
      )}
    </div>
  );
};

export default AlignmentRadar;
