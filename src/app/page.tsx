"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CHAPTERS } from "@/data/chapters";
import { SIX_STEPS } from "@/lib/sixSteps";
import { TIERS, TIER_LABEL } from "@/types/content";
import LockIcon from "@/components/LockIcon";

const ACCENT = "#38bdf8";
const GOLD = "#fbbf24";
const DIM = "#8fa6c4";
const BRIGHT = "#2f5d99";
const SUCCESS = "#34d399";

const TAGLINE =
  "把人生活成一場你能玩到通關的遊戲。建立你的英雄角色卡，一步步認識自己的天賦、角色與使命。";

const ZONES = [
  "ZONE 1 · TITLE",
  "ZONE 2 · WHY PLAY",
  "ZONE 3 · SKILL PATH",
  "ZONE 4 · STAGE SELECT",
  "ZONE 5 · RANK UP",
  "ZONE 6 · READY",
];

// 示範用的進度資料——首頁對訪客（未登入）展示「填答完會長怎樣」，不是真實使用者資料
const STEP_DETAILS: Record<number, { en: string; done: number; total: number; desc: string; hint: string }> = {
  1: {
    en: "CHOOSE YOUR GAME",
    done: 0,
    total: 3,
    desc: "先決定你要玩哪一場遊戲。不是別人替你選的職涯，而是你願意投入一萬小時的那件事。",
    hint: "從第 2 章的三個關卡開始寫下你的使命。",
  },
  2: {
    en: "KNOW YOUR ATTRIBUTES",
    done: 3,
    total: 6,
    desc: "把天賦分成王牌、戒指與基座三層：你最鋒利的那一項、支撐它的能力，以及日常累積的底盤。",
    hint: "已完成天賦金字塔的第一層盤點。",
  },
  3: {
    en: "SELECT YOUR ROLE",
    done: 0,
    total: 6,
    desc: "戰士、遊俠、法師、盜賊、德魯伊、聖騎士、術士——挑一個最像你的職業，並替自己取一個英雄名字。",
    hint: "先完成第 4.1 章的簡單關卡解鎖。",
  },
  4: {
    en: "ENHANCE YOUR SKILLS",
    done: 2,
    total: 6,
    desc: "技藝要刻意練習。把技能拆成可量測的項目，用技能網雷達圖看清哪一軸最弱。",
    hint: "技能網已建立 5 軸，還缺 2 軸。",
  },
  5: {
    en: "BUILD YOUR ALLIANCE",
    done: 1,
    total: 6,
    desc: "陣營、公會、隊伍、夥伴關係——四種人脈層級各有不同的維繫方式，別把所有人放在同一層。",
    hint: "已登錄 1 位長期夥伴，繼續擴充名冊。",
  },
  6: {
    en: "ACHIEVE YOUR QUESTS",
    done: 3,
    total: 3,
    desc: "三星成就制：自訂 1～3 星門檻，完成後回報結果。0 星會觸發兩週冷卻期，逼自己先休息再評估。",
    hint: "此步驟已通關，任務追蹤器持續運作中。",
  },
};

const HOME_STEPS = SIX_STEPS.map((s) => ({ ...s, ...STEP_DETAILS[s.step] }));

// 0=鎖定 1=可挑戰 2=已通關，跟 CHAPTERS 同順序——同樣是示範資料，不是真實進度
const DEMO_TIER_STATES: [number, number, number][] = [
  [2, 2, 2],
  [1, 0, 0],
  [2, 2, 2],
  [1, 0, 0],
  [1, 0, 0],
  [1, 0, 0],
  [2, 1, 0],
  [2, 1, 0],
  [2, 1, 0],
  [1, 0, 0],
  [2, 2, 2],
  [2, 1, 0],
];

const TIER_STATE_LABEL = ["鎖定", "可挑戰", "已通關"];

const RANKS = [
  { name: "NPC", desc: "照著別人的劇本過日子" },
  { name: "PLAYER", desc: "開始主動選擇自己的遊戲" },
  { name: "10K HP", desc: "六步驟持續對齊，進入 OP 模式" },
  { name: "OP HERO", desc: "影響得了別人，連自己都會記得" },
];

const Reveal = ({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ ...style, transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

const CountUp = ({ target, className }: { target: number; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-US")}
    </span>
  );
};

const useTypewriter = (text: string, speed = 42, startDelay = 380) => {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setOutput(text.slice(0, i));
      i += 1;
      if (i <= text.length) {
        timer = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  return { output, done };
};

const Home = () => {
  const router = useRouter();
  const { output: typedTagline, done: typedDone } = useTypewriter(TAGLINE);

  const zoneRefs = useRef<(HTMLElement | null)[]>([]);
  const transitionFillRef = useRef<HTMLDivElement>(null);
  const heroArtRef = useRef<HTMLDivElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const hudBarRef = useRef<HTMLDivElement>(null);
  const hudPctRef = useRef<HTMLSpanElement>(null);
  const hudZoneRef = useRef<HTMLSpanElement>(null);
  const rankTrackRef = useRef<HTMLDivElement>(null);
  const rankFillRef = useRef<HTMLDivElement>(null);
  const rankDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rankNameRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [sliderValue, setSliderValue] = useState(0);
  const [activeStepN, setActiveStepN] = useState(1);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [showTransition, setShowTransition] = useState(false);

  const activeStep = HOME_STEPS.find((s) => s.step === activeStepN) ?? HOME_STEPS[0];
  const activeChapter = CHAPTERS[activeChapterIdx];
  const activeChapterTiers = DEMO_TIER_STATES[activeChapterIdx];

  const scrollToZone = (index: number) => {
    const el = zoneRefs.current[index];
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  // 頂部 HUD 的「開始旅程」：蓋一個置中 LOGO ＋粗長進度條的全螢幕過場，
  // 條跑滿 0→100% 才真的跳轉，不要一點就馬上切頁面。
  const handleStartJourney = () => {
    if (showTransition) return;
    setShowTransition(true);
    const duration = 900;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      if (transitionFillRef.current) transitionFillRef.current.style.width = `${(eased * 100).toFixed(1)}%`;
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        router.push("/login");
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const y = window.scrollY || doc.scrollTop;
      const p = Math.min(1, Math.max(0, y / max));

      if (hudBarRef.current) hudBarRef.current.style.width = `${(p * 100).toFixed(1)}%`;
      if (hudPctRef.current) hudPctRef.current.textContent = `XP ${Math.round(p * 100)}%`;

      let zoneIdx = 0;
      zoneRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= 140) zoneIdx = i;
      });
      if (hudZoneRef.current) hudZoneRef.current.textContent = ZONES[Math.min(zoneIdx, ZONES.length - 1)];

      if (bgGridRef.current) {
        bgGridRef.current.style.backgroundPosition = `0 ${(y * 0.14).toFixed(0)}px, ${(y * -0.06).toFixed(0)}px 0`;
      }
      if (bgGlowRef.current) {
        bgGlowRef.current.style.transform = `translateY(${(y * 0.24).toFixed(0)}px)`;
      }
      if (heroArtRef.current) {
        const f = Math.min(1, y / 620);
        heroArtRef.current.style.opacity = String(1 - f * 0.75);
        heroArtRef.current.style.filter = `blur(${(f * 2).toFixed(1)}px)`;
      }

      const track = rankTrackRef.current;
      if (track) {
        const r = track.getBoundingClientRect();
        const prog = Math.min(1, Math.max(0, (window.innerHeight * 0.78 - r.top) / Math.max(1, r.height * 0.85)));
        if (rankFillRef.current) rankFillRef.current.style.setProperty("--rank-progress", `${(prog * 100).toFixed(1)}%`);
        RANKS.forEach((_, i) => {
          const threshold = i / Math.max(1, RANKS.length - 1);
          const lit = prog >= threshold - 0.02;
          const last = i === RANKS.length - 1;
          const dot = rankDotRefs.current[i];
          const name = rankNameRefs.current[i];
          if (dot) {
            dot.style.borderColor = lit ? (last ? GOLD : ACCENT) : BRIGHT;
            dot.style.background = lit ? (last ? GOLD : ACCENT) : "#050914";
            dot.style.boxShadow = lit ? `0 0 18px ${last ? "rgba(251,191,36,.85)" : "rgba(56,189,248,.85)"}` : "none";
          }
          if (name) name.style.color = lit ? (last ? GOLD : "#e8f1fc") : DIM;
        });
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const t = sliderValue / 100;

  return (
    <div style={{ position: "relative", overflow: "clip" }} className="min-w-0">
      {showTransition && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 px-6"
          style={{ background: "#050914" }}
        >
          <img
            src="/brand/logo-mark.svg"
            alt=""
            width={96}
            height={96}
            className="anim-float drop-shadow-[0_0_30px_rgba(56,189,248,0.7)]"
          />
          <p className="font-pixel text-xs text-dim tracking-[0.24em]">LOADING</p>
          <div className="w-full max-w-[320px]">
            <div className="xp-track h-4">
              <div ref={transitionFillRef} className="xp-fill" style={{ width: "0%" }} />
            </div>
          </div>
        </div>
      )}

      {/* 背景視差層 */}
      <div
        ref={bgGridRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(56,189,248,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.055) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        ref={bgGlowRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1400,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 46% at 50% 0%, rgba(56,189,248,.26), transparent 70%), radial-gradient(ellipse 50% 34% at 88% 60%, rgba(244,114,182,.10), transparent 70%)",
        }}
      />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, pointerEvents: "none", overflow: "hidden" }}>
        <div
          className="anim-scan"
          style={{ width: "100%", height: 120, background: "linear-gradient(180deg, transparent, rgba(56,189,248,.10), transparent)" }}
        />
      </div>

      {/* 頂部 HUD */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
          background: "rgba(5,9,20,.82)",
          borderBottom: "1px solid #1f3a63",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2.5 shrink-0">
            <img src="/brand/logo-mark.svg" alt="" width={24} height={24} className="drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            <span className="font-display text-xs font-bold tracking-[0.13em] text-dim whitespace-nowrap">10,000 HOURS OF PLAY</span>
          </div>

          <div className="flex-1 min-w-[180px] flex flex-col gap-1">
            <div className="flex justify-between items-baseline gap-2">
              <span ref={hudZoneRef} className="font-pixel text-[9px] star whitespace-nowrap">
                ZONE 1 · TITLE
              </span>
              <span ref={hudPctRef} className="font-tech text-[11px] text-dim">
                XP 0%
              </span>
            </div>
            <div className="xp-track h-2">
              <div ref={hudBarRef} className="xp-fill" style={{ width: "0%" }} />
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartJourney}
            className="btn-primary rounded-lg px-4 h-9 flex items-center text-xs font-pixel shrink-0"
          >
            開始旅程
          </button>
        </div>
      </div>

      {/* ZONE 1 · 標題 */}
      <header
        ref={(el) => {
          zoneRefs.current[0] = el;
        }}
        className="relative max-w-5xl mx-auto px-6 pt-16 sm:pt-24 pb-24 flex flex-col items-center text-center min-w-0"
      >
        <div ref={heroArtRef} className="anim-float">
          <img src="/brand/logo-mark.svg" alt="" width={104} height={104} className="drop-shadow-[0_0_30px_rgba(56,189,248,0.7)]" />
        </div>
        <p className="font-pixel text-xs star tracking-[0.3em] mt-4">10,000</p>
        <h1 className="font-display text-4xl md:text-6xl font-black mt-3 glow-accent">HOURS OF PLAY</h1>

        <p className="mt-7 max-w-xl mx-auto text-[15px] leading-relaxed text-[#c6d8ef] min-h-[92px]">
          {typedTagline}
          <span
            className="inline-block ml-0.5 align-[-3px]"
            style={{ width: 9, height: 18, background: ACCENT, animation: `anim-blink ${typedDone ? 1.4 : 1}s steps(1) infinite` }}
          />
        </p>

        <div className="mt-8 flex flex-col items-center gap-3.5">
          <button
            type="button"
            onClick={() => scrollToZone(2)}
            className="btn-primary anim-pulse-glow rounded-xl h-14 px-8 text-[15px] font-display gap-2.5"
          >
            <span className="text-sm">▶</span> PRESS START
          </button>
          <button type="button" onClick={() => scrollToZone(1)} className="font-tech text-xs text-dim tracking-wide">
            或往下滾動探索六個步驟
          </button>
          <div className="anim-float-fast mt-1 flex flex-col items-center gap-1">
            <span className="w-px h-6 block" style={{ background: "linear-gradient(180deg, transparent, #38bdf8)" }} />
            <span className="font-display text-sm" style={{ color: ACCENT }}>
              ▼
            </span>
          </div>
        </div>

        <div className="mt-16 w-full max-w-2xl flex flex-wrap justify-center gap-3">
          <Reveal className="flex-1 min-w-[200px]">
            <div className="panel p-4 flex flex-col items-center gap-1">
              <CountUp target={10000} className="font-display text-2xl font-black glow-gold" />
              <span className="font-tech text-xs text-dim">小時的刻意練習</span>
            </div>
          </Reveal>
          <Reveal delay={70} className="flex-1 min-w-[200px]">
            <div className="panel p-4 flex flex-col items-center gap-1">
              <CountUp target={6} className="font-display text-2xl font-black glow-accent" />
              <span className="font-tech text-xs text-dim">個成長步驟</span>
            </div>
          </Reveal>
          <Reveal delay={140} className="flex-1 min-w-[200px]">
            <div className="panel p-4 flex flex-col items-center gap-1">
              <CountUp target={36} className="font-display text-2xl font-black glow-accent" />
              <span className="font-tech text-xs text-dim">個可挑戰關卡</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ZONE 2 · NPC vs HERO */}
      <section
        ref={(el) => {
          zoneRefs.current[1] = el;
        }}
        className="relative max-w-5xl mx-auto px-6 pb-24 min-w-0"
      >
        <Reveal className="flex items-center gap-4 mb-6">
          <span className="font-pixel text-[11px]" style={{ color: ACCENT }}>
            ZONE 2 · WHY PLAY
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg,#1f3a63,transparent)" }} />
        </Reveal>

        <Reveal className="flex items-center justify-center gap-3.5 mb-5 flex-wrap">
          <span className="text-sm text-dim">拖動滑桿，看看兩種活法的差別</span>
          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            aria-label="NPC 到 HERO"
            className="w-full max-w-[420px]"
            style={{ accentColor: ACCENT, height: 26 }}
          />
        </Reveal>

        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          <Reveal>
            <div
              className="panel p-6 space-y-3.5 h-full"
              style={{
                opacity: 1 - t * 0.6,
                filter: `grayscale(${t})`,
                transform: `scale(${(1 - t * 0.03).toFixed(3)})`,
                transition: "opacity .2s linear, filter .2s linear, transform .2s linear",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-pixel text-[10px] text-dim">MODE · NPC</span>
                <span className="font-tech text-xs text-dim">{Math.round((1 - t) * 100)}%</span>
              </div>
              <h3 className="text-lg font-bold">被動照著別人的劇本過日子</h3>
              <p className="text-sm text-dim leading-relaxed">
                大多數人是自己人生裡的「NPC」——被動地照著別人寫好的劇本過日子。這本書提出一個問題：你想繼續當
                NPC，還是成為自己故事裡的英雄？
              </p>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div
              className="panel p-6 space-y-3.5 h-full"
              style={{
                borderColor: t > 0.5 ? GOLD : BRIGHT,
                boxShadow: `inset 0 0 0 1px rgba(251,191,36,${(t * 0.22).toFixed(2)}), 0 0 ${(10 + t * 34).toFixed(0)}px -12px rgba(251,191,36,${(t * 0.75).toFixed(2)})`,
                transform: `scale(${(1 + t * 0.02).toFixed(3)})`,
                transition: "border-color .2s linear, box-shadow .2s linear, transform .2s linear",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-pixel text-[10px] star">MODE · OP HERO</span>
                <span className="font-tech text-xs star">{Math.round(t * 100)}%</span>
              </div>
              <h3 className="text-lg font-bold">主動玩到通關，而不是苦撐著過完</h3>
              <p className="text-sm text-dim leading-relaxed">
                「一萬小時的遊戲」把「刻意練習一萬小時就能精通」重新詮釋成一場你能主動選擇、主動玩的遊戲。六個步驟全部對齊，你會進入真正發揮實力的「OP
                模式」。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ZONE 3 · 六步驟 */}
      <section
        ref={(el) => {
          zoneRefs.current[2] = el;
        }}
        className="relative max-w-5xl mx-auto px-6 pb-24 min-w-0"
      >
        <Reveal className="flex items-center gap-4 mb-3">
          <span className="font-pixel text-[11px]" style={{ color: ACCENT }}>
            ZONE 3 · SKILL PATH
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg,#1f3a63,transparent)" }} />
          <span className="font-tech text-xs text-dim">點擊節點查看</span>
        </Reveal>
        <Reveal delay={40}>
          <p className="max-w-xl text-sm leading-relaxed text-dim mb-6">
            六個步驟依序解鎖：先認識自己（選對遊戲、認清天賦、選對角色），再持續成長（磨練技能、建立盟友、追求任務）。
          </p>
        </Reveal>

        <div className="flex flex-wrap gap-3">
          {HOME_STEPS.map((step, i) => {
            const on = activeStepN === step.step;
            return (
              <Reveal key={step.step} delay={i * 60} className="flex-1 min-w-[140px]">
                <button
                  type="button"
                  onClick={() => setActiveStepN(step.step)}
                  className="w-full min-h-[132px] p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition hover:-translate-y-1"
                  style={{
                    borderColor: on ? ACCENT : "#1f3a63",
                    background: on ? "linear-gradient(180deg,#0f2242,#173561)" : "linear-gradient(180deg,#0d1b33,#12274a)",
                    boxShadow: on
                      ? "inset 0 0 0 1px rgba(56,189,248,.2), 0 0 30px -10px rgba(56,189,248,.75)"
                      : "0 0 26px -14px rgba(0,0,0,.8)",
                  }}
                >
                  <span
                    className="w-11 h-11 rounded-full border-2 flex items-center justify-center font-display text-lg font-black"
                    style={{
                      borderColor: on ? ACCENT : BRIGHT,
                      background: on ? "rgba(56,189,248,.16)" : "#04101f",
                      color: on ? ACCENT : DIM,
                      boxShadow: on ? "0 0 18px rgba(56,189,248,.75)" : "none",
                    }}
                  >
                    {step.step}
                  </span>
                  <span className="font-pixel text-[8px]" style={{ color: on ? GOLD : DIM }}>
                    STEP {step.step}
                  </span>
                  <span className="text-sm font-bold whitespace-nowrap">{step.label}</span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <div className="panel panel-glow mt-5 p-6 flex flex-wrap items-start gap-6">
          <div className="flex-1 min-w-[260px] space-y-2">
            <span className="font-pixel text-[9px] star">
              STEP {activeStep.step} · {activeStep.en}
            </span>
            <h3 className="font-display text-2xl font-black">{activeStep.label}</h3>
            <p className="text-sm leading-relaxed text-dim">{activeStep.desc}</p>
          </div>
          <div className="flex flex-col gap-3" style={{ flex: "0 1 230px" }}>
            <span className="font-tech text-xs text-dim">關卡進度</span>
            <div className="xp-track h-2.5">
              <div className="xp-fill" style={{ width: `${Math.round((activeStep.done / activeStep.total) * 100)}%` }} />
            </div>
            <span className="font-display text-sm font-bold">
              {activeStep.done} / {activeStep.total} 關卡
            </span>
            <span className="text-sm leading-relaxed text-dim">{activeStep.hint}</span>
          </div>
        </div>
      </section>

      {/* ZONE 4 · 關卡選單 */}
      <section
        ref={(el) => {
          zoneRefs.current[3] = el;
        }}
        className="relative max-w-5xl mx-auto px-6 pb-24 min-w-0"
      >
        <Reveal className="flex items-center gap-4 mb-3">
          <span className="font-pixel text-[11px]" style={{ color: "#f472b6" }}>
            ZONE 4 · STAGE SELECT
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg,#1f3a63,transparent)" }} />
          <span className="font-tech text-xs text-dim whitespace-nowrap">12 CHAPTERS · 36 關卡</span>
        </Reveal>

        <div className="flex flex-wrap gap-5 items-start">
          <div className="flex-1 min-w-0 basis-[520px] grid gap-3 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
            {CHAPTERS.map((chapter, i) => {
              const on = activeChapterIdx === i;
              const cleared = DEMO_TIER_STATES[i].every((x) => x === 2);
              return (
                <Reveal key={chapter.id} delay={(i % 6) * 50} className="h-full">
                  <button
                    type="button"
                    onClick={() => setActiveChapterIdx(i)}
                    className="w-full h-full p-3.5 rounded-xl border text-left flex flex-col gap-2 transition hover:-translate-y-1"
                    style={{
                      borderColor: on ? GOLD : cleared ? "rgba(251,191,36,.45)" : "#1f3a63",
                      background: "linear-gradient(180deg,#0d1b33,#12274a)",
                      boxShadow: on ? "0 0 26px -8px rgba(251,191,36,.7)" : "none",
                    }}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-tech text-xs" style={{ color: on ? GOLD : DIM }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex gap-0.5">
                        {DEMO_TIER_STATES[i].map((state, j) => (
                          <span
                            key={j}
                            className="w-1.5 h-1.5 rounded-sm border"
                            style={{
                              background: state === 2 ? SUCCESS : state === 1 ? ACCENT : "transparent",
                              borderColor: state === 2 ? SUCCESS : state === 1 ? ACCENT : BRIGHT,
                            }}
                          />
                        ))}
                      </span>
                    </div>
                    <span className="text-[13.5px] font-bold leading-snug">{chapter.title}</span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={100} className="sticky top-24" style={{ flex: "0 1 320px" }}>
            <div
              className="p-6 rounded-2xl border flex flex-col gap-3.5"
              style={{
                borderColor: GOLD,
                background: "linear-gradient(180deg,#0d1b33,#12274a)",
                boxShadow: "inset 0 0 0 1px rgba(251,191,36,.14), 0 0 30px -14px rgba(251,191,36,.5)",
              }}
            >
              <span className="font-pixel text-[9px] star">NOW SELECTED</span>
              <h3 className="text-lg font-bold leading-snug">{activeChapter.title}</h3>
              <p className="font-display text-xs text-dim leading-relaxed">{activeChapter.subtitle}</p>
              <div className="flex flex-col gap-2">
                {TIERS.map((tier, i) => {
                  const state = activeChapterTiers[i];
                  const color = state === 2 ? SUCCESS : state === 1 ? "#c6d8ef" : DIM;
                  const border = state === 2 ? SUCCESS : state === 1 ? BRIGHT : "#1f3a63";
                  const fill = state === 2 ? "rgba(52,211,153,.10)" : state === 1 ? "rgba(56,189,248,.06)" : "transparent";
                  return (
                    <div
                      key={tier}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-sm"
                      style={{ borderColor: border, background: fill, color }}
                    >
                      <span className="flex items-center gap-1.5">
                        {state === 0 && <LockIcon className="w-3 h-3" />}
                        {TIER_LABEL[tier]}
                      </span>
                      <span className="font-tech text-xs">{TIER_STATE_LABEL[state]}</span>
                    </div>
                  );
                })}
              </div>
              <Link href="/login" className="btn-primary rounded-lg h-11 flex items-center justify-center text-sm">
                進入這一關 →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ZONE 5 · 等級路線 */}
      <section
        ref={(el) => {
          zoneRefs.current[4] = el;
        }}
        className="relative max-w-5xl mx-auto px-6 pb-24 min-w-0"
      >
        <Reveal className="flex items-center gap-4 mb-6">
          <span className="font-pixel text-[11px]" style={{ color: ACCENT }}>
            ZONE 5 · RANK UP
          </span>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg,#1f3a63,transparent)" }} />
        </Reveal>

        <div ref={rankTrackRef} className="relative py-2 sm:py-8">
          <div className="rank-line" />
          <div ref={rankFillRef} className="rank-fill" />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-3">
            {RANKS.map((rank, i) => (
              <div
                key={rank.name}
                className="flex items-start gap-4 text-left sm:flex-1 sm:min-w-[130px] sm:flex-col sm:items-center sm:gap-2.5 sm:text-center"
              >
                <span
                  ref={(el) => {
                    rankDotRefs.current[i] = el;
                  }}
                  className="shrink-0 rounded-full border-2 block"
                  style={{ width: 26, height: 26, borderColor: BRIGHT, background: "#050914", transition: "all .3s ease" }}
                />
                <div className="flex flex-col gap-1 sm:contents">
                  <span
                    ref={(el) => {
                      rankNameRefs.current[i] = el;
                    }}
                    className="font-display text-sm font-black tracking-wide whitespace-nowrap"
                    style={{ color: DIM, transition: "color .3s ease" }}
                  >
                    {rank.name}
                  </span>
                  <span className="text-sm leading-relaxed text-dim sm:max-w-[190px]">{rank.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE 6 · CTA */}
      <section
        ref={(el) => {
          zoneRefs.current[5] = el;
        }}
        className="relative max-w-5xl mx-auto px-6 pb-28 min-w-0"
      >
        <Reveal>
          <div
            className="relative overflow-hidden p-10 sm:p-14 rounded-2xl border flex flex-col items-center text-center gap-4"
            style={{
              borderColor: BRIGHT,
              background:
                "radial-gradient(ellipse 70% 90% at 20% 0%, rgba(56,189,248,.26), transparent 70%), linear-gradient(125deg,#0d1b33,#071022)",
              boxShadow: "inset 0 0 0 1px rgba(56,189,248,.12), 0 0 40px -16px rgba(56,189,248,.5)",
            }}
          >
            <img
              src="/brand/logo-mark.svg"
              alt=""
              width={58}
              height={58}
              className="relative drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]"
            />
            <p className="relative font-pixel text-[11px] star">READY PLAYER ONE</p>
            <h2 className="relative font-display text-2xl sm:text-4xl font-black leading-tight">建立你的英雄角色卡</h2>
            <p className="relative max-w-lg text-[15px] leading-relaxed text-[#c6d8ef]">
              從 NPC 到 OP HERO，一次一關。現在就開始寫下你的使命、天賦、角色與準則。
            </p>
            <Link href="/login" className="btn-primary anim-pulse-glow rounded-xl h-14 px-8 mt-2 text-[15px] font-display gap-2.5 relative">
              <span className="text-sm">▶</span> 開始你的英雄旅程
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
