import { clerkConfigured, supabaseConfigured } from "@/lib/env";

const SetupNotice = () => {
  const clerkOk = clerkConfigured();
  const supabaseOk = supabaseConfigured();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="panel panel-glow max-w-md p-8 space-y-4 text-center">
        <p className="font-display text-sm star">尚未完成環境設定</p>
        {!clerkOk && (
          <p className="text-sm text-dim leading-relaxed">
            缺少 Clerk 設定：請在 <code className="text-[var(--color-accent)]">.env.local</code> 填入
            <code className="text-[var(--color-accent)]"> NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> 與
            <code className="text-[var(--color-accent)]"> CLERK_SECRET_KEY</code>。
          </p>
        )}
        {!supabaseOk && (
          <p className="text-sm text-dim leading-relaxed">
            缺少 Supabase 設定：請填入
            <code className="text-[var(--color-accent)]"> SUPABASE_URL</code> 與
            <code className="text-[var(--color-accent)]"> SUPABASE_SERVICE_ROLE_KEY</code>
            （在 Supabase 專案的 Settings → API 頁面）。
          </p>
        )}
        <p className="text-xs text-dim">詳見 README 的設定步驟。</p>
      </div>
    </div>
  );
};

export default SetupNotice;
