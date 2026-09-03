import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { createAdminClient } from "@/lib/supabase/admin";
import { appConfigured } from "@/lib/env";
import { CHAPTERS } from "@/data/chapters";
import { buildProgressMap, getChapterProgress, totalCompletedTiers } from "@/lib/progress";
import ChapterCard from "@/components/ChapterCard";
import HeroNameEditor from "@/components/HeroNameEditor";
import SignOutButton from "@/components/SignOutButton";
import SetupNotice from "@/components/SetupNotice";

const DashboardPage = async () => {
  if (!appConfigured()) return <SetupNotice />;

  const { userId } = await auth();
  if (!userId) redirect("/login");

  const supabase = createAdminClient();
  const [
    { data: profile, error: profileError },
    { data: progressRows, error: progressError },
    user,
  ] = await Promise.all([
    supabase.from("profiles").select("hero_name").eq("user_id", userId).maybeSingle(),
    supabase
      .from("chapter_progress")
      .select("chapter_id, tier, completed_at")
      .eq("user_id", userId),
    currentUser(),
  ]);
  if (profileError) throw new Error(`讀取角色資料失敗：${profileError.message}`);
  if (progressError) throw new Error(`讀取進度失敗：${progressError.message}`);

  const defaultName = profile?.hero_name || user?.fullName || user?.username || "";
  const progressMap = buildProgressMap(progressRows ?? []);
  const chapterIds = CHAPTERS.map((c) => c.id);
  const totalTiers = chapterIds.length * 3;
  const done = totalCompletedTiers(progressMap, chapterIds);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-xs text-dim">PHASE I · 認識自己</p>
          <div className="mt-2">
            <HeroNameEditor initialName={defaultName} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SignOutButton />
          <UserButton />
        </div>
      </div>

      <div className="panel p-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-dim">整體進度</span>
          <span className="font-display">
            {done} / {totalTiers} 關卡
          </span>
        </div>
        <div className="h-2 rounded-full bg-black/40 overflow-hidden">
          <div
            className="h-full bg-[var(--color-accent)]"
            style={{ width: `${totalTiers > 0 ? (done / totalTiers) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CHAPTERS.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            progress={getChapterProgress(progressMap, chapter.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
