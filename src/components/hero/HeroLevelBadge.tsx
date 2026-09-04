import type { HeroLevel, HeroLevelInfo } from "@/lib/heroStatus";
import { HERO_LEVEL_LABEL } from "@/lib/heroStatus";

const LEVEL_DESCRIPTION: Record<HeroLevel, string> = {
  npc: "尚未展開旅程——你的英雄旅程即將開始。",
  player: "你正在主動玩你的人生遊戲，持續完成六步驟。",
  opPlayer: "六步驟已全面對齊，你已進入 OP 模式。",
  opHero: "全部旅程完成，你的故事已足以成為傳奇。",
};

const HeroLevelBadge = ({ info }: { info: HeroLevelInfo }) => {
  return (
    <div className="panel p-5 min-w-0 flex flex-col items-center justify-center text-center gap-2 panel-glow">
      <p className="font-display text-xs text-dim tracking-widest">目前等級</p>
      <p className="font-display text-2xl font-black star">{HERO_LEVEL_LABEL[info.level]}</p>
      <p className="text-xs text-dim">{LEVEL_DESCRIPTION[info.level]}</p>
      <p className="text-xs text-dim">
        {info.totalCompleted} / {info.totalTiers} 關卡
        {info.phase1Complete && info.level !== "opHero" ? "・Phase I 已全通" : ""}
      </p>
    </div>
  );
};

export default HeroLevelBadge;
