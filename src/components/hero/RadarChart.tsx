"use client";

import { useEffect, useRef, useState } from "react";
import type { RadarAxis } from "@/lib/heroStatus";

const MAX_RADIUS_RATIO = 0.24; // 相對於實際量到的寬度，反推半徑，確保任何欄寬下文字都不會被裁到
const LABEL_OFFSET = 12;
const LABEL_FONT_SIZE = 12;
const MARKER_R = 3.5;

const pointAt = (center: number, radius: number, angle: number) => ({
  x: center + radius * Math.cos(angle),
  y: center + radius * Math.sin(angle),
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(w);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const n = axes.length;
  const hasData = axes.some((a) => a.value > 0);

  if (n < 3) return null;

  const angleFor = (i: number) => -Math.PI / 2 + (2 * Math.PI * i) / n;

  return (
    <div ref={containerRef} className="min-w-0 space-y-1">
      <p className="font-display text-sm text-dim tracking-widest">{title}</p>

      {width !== null &&
        (() => {
          const size = width;
          const center = size / 2;
          const maxRadius = size * MAX_RADIUS_RATIO;
          const gridLevels = Array.from({ length: max }, (_, i) => i + 1);
          const dataPoints = axes.map((axis, i) => pointAt(center, (axis.value / max) * maxRadius, angleFor(i)));
          const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

          return (
            <svg
              viewBox={`0 0 ${size} ${size}`}
              role="img"
              aria-label={`${title}：${axes.map((a) => `${a.label} ${a.value}/${max}`).join("、")}`}
              className="block w-full"
            >
              <title>{title}</title>
              {gridLevels.map((level) => {
                const radius = (level / max) * maxRadius;
                const ringPoints = Array.from({ length: n }, (_, i) => pointAt(center, radius, angleFor(i)))
                  .map((p) => `${p.x},${p.y}`)
                  .join(" ");
                return (
                  <polygon key={level} points={ringPoints} fill="none" stroke="var(--color-border)" strokeWidth={1} />
                );
              })}

              {axes.map((_, i) => {
                const outer = pointAt(center, maxRadius, angleFor(i));
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
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
                dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={MARKER_R} fill={color} />)}

              {axes.map((axis, i) => {
                const labelPoint = pointAt(center, maxRadius + LABEL_OFFSET, angleFor(i));
                return (
                  <text
                    key={axis.key}
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor={anchorFor(angleFor(i))}
                    dominantBaseline="middle"
                    fontSize={LABEL_FONT_SIZE}
                    fill="var(--color-text-dim)"
                  >
                    {axis.label} {axis.value}
                  </text>
                );
              })}
            </svg>
          );
        })()}

      <p className="text-sm text-dim text-center">每軸滿分 {max} 分</p>
      {!hasData && emptyHint && <p className="text-sm text-dim text-center">{emptyHint}</p>}
    </div>
  );
};

export default RadarChart;
