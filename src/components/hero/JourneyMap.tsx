"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroLevel, JourneyEvent } from "@/lib/heroStatus";
import { TIER_LABEL } from "@/types/content";

const NODE_TARGET_WIDTH = 130; // 每個節點理想寬度（px），用來反推每列放幾個，讓地圖填滿實際寬度
const MIN_ITEMS_PER_ROW = 2;
const MAX_ITEMS_PER_ROW = 6;
const SPACING_Y = 90;
const PADDING_Y = 45;
const NODE_R = 10;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("zh-TW", { month: "2-digit", day: "2-digit" });

const layout = (n: number, itemsPerRow: number, spacingX: number): { x: number; y: number }[] => {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / itemsPerRow);
    let col = i % itemsPerRow;
    if (row % 2 === 1) col = itemsPerRow - 1 - col;
    points.push({ x: spacingX * (col + 0.5), y: PADDING_Y + row * SPACING_Y });
  }
  return points;
};

const JourneyMap = ({
  events,
  chapterLabels,
  heroLevel,
  nextChapterLabel,
}: {
  events: JourneyEvent[];
  chapterLabels: Record<string, string>;
  heroLevel: HeroLevel;
  nextChapterLabel?: string | null;
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

  if (events.length === 0 && !nextChapterLabel) {
    return (
      <div className="panel p-5 text-center">
        <p className="text-sm text-dim">完成第一個關卡後，這裡會開始畫出你的成長路線地圖。</p>
      </div>
    );
  }

  const heroReached = heroLevel === "opHero";

  if (width === null) {
    return (
      <div ref={containerRef} className="panel p-5 space-y-2 min-w-0">
        <p className="font-display text-sm text-dim tracking-widest">成長路線地圖</p>
      </div>
    );
  }

  const hasNextStation = Boolean(nextChapterLabel);
  const totalNodes = events.length + (hasNextStation ? 1 : 0) + 1; // +下一站（若有）+ 終點 OP Hero
  const itemsPerRow = Math.min(MAX_ITEMS_PER_ROW, Math.max(MIN_ITEMS_PER_ROW, Math.floor(width / NODE_TARGET_WIDTH)));
  const spacingX = width / itemsPerRow;
  const points = layout(totalNodes, itemsPerRow, spacingX);
  const rows = Math.ceil(totalNodes / itemsPerRow);
  const height = PADDING_Y * 2 + (rows - 1) * SPACING_Y;
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const nextStationPoint = hasNextStation ? points[events.length] : null;
  const destination = points[points.length - 1];

  return (
    <div ref={containerRef} className="panel p-5 space-y-2 min-w-0">
      <p className="font-display text-sm text-dim tracking-widest">成長路線地圖</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`人生旅程路線圖：已完成 ${events.length} 個關卡${
          hasNextStation ? `，下一站是「${nextChapterLabel}」` : ""
        }，${heroReached ? "已抵達" : "尚未抵達"} OP Hero 終點`}
        className="block w-full"
      >
        <title>成長路線地圖</title>
        <path d={pathD} fill="none" stroke="var(--color-border-bright)" strokeWidth={2} strokeDasharray="4 4" />

        {events.map((event, i) => {
          const p = points[i];
          return (
            <g key={`${event.chapterId}-${event.tier}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                fill="var(--color-accent)"
                stroke="var(--color-bg)"
                strokeWidth={2}
                style={{ filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))" }}
              />
              <text x={p.x} y={p.y + NODE_R + 18} textAnchor="middle" fontSize={13} fill="var(--color-text-dim)">
                {chapterLabels[event.chapterId] ?? event.chapterId}
              </text>
              <text x={p.x} y={p.y + NODE_R + 33} textAnchor="middle" fontSize={11} fill="var(--color-text-dim)">
                {TIER_LABEL[event.tier]}・{formatDate(event.completedAt)}
              </text>
            </g>
          );
        })}

        {nextStationPoint && (
          <g>
            <circle
              cx={nextStationPoint.x}
              cy={nextStationPoint.y}
              r={NODE_R + 2}
              fill="var(--color-bg)"
              stroke="var(--color-accent)"
              strokeWidth={2}
              strokeDasharray="3 3"
            />
            <text
              x={nextStationPoint.x}
              y={nextStationPoint.y + 5}
              textAnchor="middle"
              fontSize={12}
              fill="var(--color-accent)"
            >
              →
            </text>
            <text
              x={nextStationPoint.x}
              y={nextStationPoint.y + NODE_R + 20}
              textAnchor="middle"
              fontSize={13}
              fill="var(--color-accent)"
            >
              下一站
            </text>
            <text
              x={nextStationPoint.x}
              y={nextStationPoint.y + NODE_R + 35}
              textAnchor="middle"
              fontSize={11}
              fill="var(--color-text-dim)"
            >
              {nextChapterLabel}
            </text>
          </g>
        )}

        <g>
          <circle
            cx={destination.x}
            cy={destination.y}
            r={NODE_R + 4}
            fill={heroReached ? "var(--color-gold)" : "none"}
            stroke="var(--color-gold)"
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 0 8px rgba(251,191,36,0.75))" }}
          />
          <text
            x={destination.x}
            y={destination.y + 5}
            textAnchor="middle"
            fontSize={14}
            fill={heroReached ? "var(--color-bg)" : "var(--color-gold)"}
          >
            ★
          </text>
          <text
            x={destination.x}
            y={destination.y + NODE_R + 22}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-gold)"
            style={{
              fontFamily: "var(--font-pixel), var(--font-display), monospace",
              letterSpacing: "0.05em",
              textShadow: "0 0 12px rgba(251,191,36,0.7)",
            }}
          >
            OP HERO
          </text>
        </g>
      </svg>
    </div>
  );
};

export default JourneyMap;
