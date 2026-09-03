export default function SetupNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="panel panel-glow max-w-md p-8 space-y-3 text-center">
        <p className="font-display text-sm star">尚未設定 Supabase</p>
        <p className="text-sm text-dim leading-relaxed">
          請先在 Supabase 建立專案、跑過 <code className="text-[var(--color-accent)]">supabase/schema.sql</code>，
          再把 Project URL 與 anon key 填進環境變數
          <code className="text-[var(--color-accent)]"> NEXT_PUBLIC_SUPABASE_URL</code> 和
          <code className="text-[var(--color-accent)]"> NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
          （本機用 .env.local，Vercel 用專案的 Environment Variables）。詳見 README。
        </p>
      </div>
    </div>
  );
}
