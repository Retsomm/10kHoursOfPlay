import type { RadarAxis } from "@/lib/heroStatus";

const SIZE = 340;
const CENTER = SIZE / 2;
const MAX_RADIUS = 95;
const LABEL_OFFSET = 16;

const pointAt = (radius: number, angle: number) => ({
  x: CENTER + radius * Math.cos(angle),
  y: CENTER + radius * Math.sin(angle),
});

const anchorFor = (angle: number): "start" | "middle" | "end" => {
  const cos = Math.cos(angle);
  if (cos > 0.3) return "start";
  if (cos < -0.3) return "end";
  return "middle";
};

const RadarChart = ({
  title,
  axes,
  max = 5,
  color = "var(--color-accent)",
  emptyHint,
}: {
  title: string;
  axes: RadarAxis[];
  max?: number;
  color?: string;
  emptyHint?: string;
}) => {
  const n = axes.length;
  const hasData = axes.some((a) => a.value > 0);

  if (n < 3) return null;

  const angleFor = (i: number) => -Math.PI / 2 + (2 * Math.PI * i) / n;

  const gridLevels = Array.from({ length: max }, (_, i) => i + 1);
  const dataPoints = axes.map((axis, i) => pointAt((axis.value / max) * MAX_RADIUS, angleFor(i)));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="min-w-0 space-y-1">
      <p className="font-display text-xs text-dim tracking-widest">{title}</p>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`${title}：${axes.map((a) => `${a.label} ${a.value}/${max}`).join("、")}`}
        className="block w-full max-w-[300px] mx-auto"
      >
        <title>{title}</title>
        {gridLevels.map((level) => {
          const radius = (level / max) * MAX_RADIUS;
          const ringPoints = Array.from({ length: n }, (_, i) => pointAt(radius, angleFor(i)))
            .map((p) => `${p.x},${p.y}`)
            .join(" ");
          return (
            <polygon
              key={level}
              points={ringPoints}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={1}
            />
          );
        })}

        {axes.map((_, i) => {
          const outer = pointAt(MAX_RADIUS, angleFor(i));
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--color-border)"
              strokeWidth={1}
            />
          );
        })}

        {hasData && (
          <polygon points={dataPath} fill={color} fillOpacity={0.22} stroke={color} strokeWidth={2} />
        )}

        {hasData &&
          dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={color} />)}

        {axes.map((axis, i) => {
          const labelPoint = pointAt(MAX_RADIUS + LABEL_OFFSET, angleFor(i));
          return (
            <text
              key={axis.key}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor={anchorFor(angleFor(i))}
              dominantBaseline="middle"
              fontSize={10}
              fill="var(--color-text-dim)"
            >
              {axis.label} {axis.value}
            </text>
          );
        })}
      </svg>
      <p className="text-[10px] text-dim text-center">每軸滿分 {max} 分</p>
      {!hasData && emptyHint && <p className="text-xs text-dim text-center">{emptyHint}</p>}
    </div>
  );
};

export default RadarChart;
