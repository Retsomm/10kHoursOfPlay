import Link from "next/link";
import type { QuestCounts } from "@/lib/quests";

const QuestSummaryCard = ({
  counts,
  migrationPending,
}: {
  counts: QuestCounts;
  migrationPending?: boolean;
}) => {
  if (migrationPending) {
    return (
      <div className="panel p-5 min-w-0 space-y-2">
        <p className="font-display text-sm text-dim tracking-widest">任務追蹤器</p>
        <p className="text-sm text-dim">
          這個功能需要先在 Supabase 執行最新的 <code>supabase/schema.sql</code>（新增
          quests 表），跑完之後重新整理這頁就會出現。
        </p>
      </div>
    );
  }

  return (
    <Link href="/quests" className="panel p-5 min-w-0 block hover:panel-glow transition space-y-3">
      <p className="font-display text-sm text-dim tracking-widest">任務追蹤器</p>
      {counts.total === 0 ? (
        <p className="text-sm text-dim">還沒有任務，點這裡建立第一個</p>
      ) : (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="font-display text-xl font-black" style={{ color: "var(--color-accent)" }}>
              {counts.active}
            </p>
            <p className="text-sm text-dim">進行中</p>
          </div>
          <div>
            <p className="font-display text-xl font-black star">{counts.completed}</p>
            <p className="text-sm text-dim">已完成</p>
          </div>
          <div>
            <p className="font-display text-xl font-black" style={{ color: "var(--color-danger)" }}>
              {counts.cooldown}
            </p>
            <p className="text-sm text-dim">冷卻中</p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default QuestSummaryCard;
