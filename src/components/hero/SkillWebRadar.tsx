import Link from "next/link";
import type { RadarAxis } from "@/lib/heroStatus";
import RadarChart from "./RadarChart";

const SkillWebRadar = ({ axes, chapterHref }: { axes: RadarAxis[]; chapterHref: string }) => {
  const hasData = axes.some((a) => a.value > 0);
  return (
    <div className="panel p-5 min-w-0">
      <RadarChart title="技能網" axes={axes} max={5} color="var(--color-gold)" />
      {!hasData && (
        <p className="text-sm text-dim text-center mt-2">
          <Link href={chapterHref} className="text-[var(--color-accent)] hover:underline">
前往「職業技能」評分 →
          </Link>
        </p>
      )}
    </div>
  );
};

export default SkillWebRadar;
