import Link from "next/link";
import { CHAPTERS } from "@/data/chapters";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto w-full px-6 pt-24 pb-16 text-center">
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

      <section className="max-w-5xl mx-auto w-full px-6 pb-24">
        <p className="font-display text-xs text-dim text-center mb-6 tracking-widest">
          PHASE I · KNOW YOURSELF
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((chapter) => (
            <div key={chapter.id} className="panel p-5">
              <p className="text-xs text-dim font-display">{chapter.number}</p>
              <h3 className="font-bold mt-1">{chapter.title}</h3>
              <p className="text-xs text-dim mt-1">{chapter.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
