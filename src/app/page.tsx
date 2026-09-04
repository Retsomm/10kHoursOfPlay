import Link from "next/link";
import { CHAPTERS } from "@/data/chapters";
import { PHASE_LABEL, type Phase } from "@/types/content";

const PHASES: Phase[] = ["I", "II"];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col min-w-0">
      <header className="max-w-5xl mx-auto w-full px-6 pt-24 pb-16 text-center min-w-0">
        <p className="font-display text-sm star tracking-[0.3em]">10,000</p>
        <h1 className="font-display text-4xl md:text-5xl font-black mt-2">
          HOURS OF PLAY
        </h1>
        <p className="text-dim mt-4 max-w-xl mx-auto">
          把人生活成一場你能玩到通關的遊戲。建立你的英雄角色卡，一步步認識自己的天賦、
          角色與使命，記錄你朝向專精與自我實現前進的每一段旅程。
        </p>
        <Link
          href="/login"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-[var(--color-accent)] text-[#04121f] font-bold hover:brightness-110 transition"
        >
          開始你的英雄旅程
        </Link>
      </header>

      <section className="max-w-5xl mx-auto w-full px-6 pb-16 min-w-0">
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          <div className="panel p-6 space-y-3 min-w-0">
            <p className="font-display text-sm star tracking-widest">為什麼要把人生當遊戲玩</p>
            <p className="text-dim text-sm leading-relaxed">
              大多數人是自己人生裡的「NPC」——被動地照著別人寫好的劇本過日子。這本書提出一個
              問題：你想繼續當 NPC，還是成為自己故事裡的英雄？「一萬小時的遊戲」把「刻意練習
              一萬小時就能精通」這個經典概念重新詮釋成一場你能主動選擇、主動玩的遊戲——不是
              苦撐著過完人生，而是玩到通關。
            </p>
          </div>
          <div className="panel p-6 space-y-3 min-w-0">
            <p className="font-display text-sm star tracking-widest">想帶你達成的結果</p>
            <p className="text-dim text-sm leading-relaxed">
              透過六個步驟——先認識自己（選對遊戲、認清天賦、選對角色），再持續成長（磨練
              技能、建立盟友、追求任務）——一步步從被動的 NPC，晉級成主動玩自己人生遊戲的
              「10K HP Player」。當六個步驟全部對齊，你會進入真正發揮實力的「OP 模式」，
              最終成為連自己都會記得、影響得了別人的「OP Hero」。
            </p>
          </div>
        </div>
      </section>

      {PHASES.map((phase) => (
        <section key={phase} className="max-w-5xl mx-auto w-full px-6 pb-16 min-w-0">
          <p className="font-display text-sm text-dim text-center mb-6 tracking-widest">
            {PHASE_LABEL[phase]}
          </p>
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]">
            {CHAPTERS.filter((c) => c.phase === phase).map((chapter) => (
              <div key={chapter.id} className="panel p-5">
                <h3 className="font-bold">{chapter.title}</h3>
                <p className="text-sm text-dim mt-1">{chapter.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
