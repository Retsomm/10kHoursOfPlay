import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { appConfigured } from "@/lib/env";
import { buildAnswersMap, getTierAnswers } from "@/lib/answers";
import { isMissingQuestsTableError, type Quest } from "@/lib/quests";
import SetupNotice from "@/components/SetupNotice";
import QuestForm from "@/components/quests/QuestForm";
import QuestCard from "@/components/quests/QuestCard";

const QuestsPage = async () => {
  if (!appConfigured()) return <SetupNotice />;

  const { userId } = await auth();
  if (!userId) redirect("/login");

  const supabase = createAdminClient();
  const [
    { data: quests, error: questsError },
    { data: answerRows, error: answersError },
  ] = await Promise.all([
    supabase.from("quests").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase
      .from("answers")
      .select("chapter_id, tier, field_key, value")
      .eq("user_id", userId)
      .eq("chapter_id", "ch8"),
  ]);
  if (answersError) throw new Error(`讀取第8章答案失敗：${answersError.message}`);

  if (questsError && !isMissingQuestsTableError(questsError)) {
    throw new Error(`讀取任務失敗：${questsError.message}`);
  }

  if (questsError) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-4 min-w-0">
        <Link href="/dashboard" className="text-sm text-dim hover:text-[var(--color-accent)]">
          ← 回到角色卡
        </Link>
        <div className="panel p-5 space-y-2">
          <h1 className="font-display text-xl font-bold">任務追蹤器尚未就緒</h1>
          <p className="text-dim text-sm">
            需要先在 Supabase 專案的 SQL Editor 執行最新的{" "}
            <code>supabase/schema.sql</code>（新增 <code>quests</code> 表），跑完之後重新整理這頁即可。
          </p>
        </div>
      </div>
    );
  }

  const answersMap = buildAnswersMap(answerRows ?? []);
  const ch8Medium = getTierAnswers(answersMap, "ch8", "medium");
  const prefill = {
    title: typeof ch8Medium.goal === "string" ? ch8Medium.goal : "",
    reward: typeof ch8Medium.reward === "string" ? ch8Medium.reward : "",
  };

  const questList = (quests ?? []) as Quest[];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8 min-w-0">
      <div>
        <Link href="/dashboard" className="text-sm text-dim hover:text-[var(--color-accent)]">
          ← 回到角色卡
        </Link>
        <p className="font-display text-sm text-dim mt-4">CH.8 · QUESTS</p>
        <h1 className="font-display text-2xl md:text-3xl font-bold mt-1">任務追蹤器</h1>
        <p className="text-dim mt-1">
          書中的三星成就制：先設定 1～3 星的門檻，完成後回報結果——0
          星會進入兩週冷卻期，逼自己先休息、重新評估，而不是硬撐著繼續。
        </p>
      </div>

      <QuestForm prefill={prefill} />

      <div className="space-y-4">
        {questList.length === 0 ? (
          <p className="text-sm text-dim">還沒有任何任務，從上面新增一個開始吧。</p>
        ) : (
          questList.map((quest) => <QuestCard key={quest.id} quest={quest} />)
        )}
      </div>
    </div>
  );
};

export default QuestsPage;
