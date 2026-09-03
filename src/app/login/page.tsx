"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import SetupNotice from "@/components/SetupNotice";

const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!SUPABASE_CONFIGURED) return <SetupNotice />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("sent");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="panel panel-glow w-full max-w-sm p-8 space-y-6">
        <div className="text-center">
          <p className="font-display text-xs star tracking-widest">10,000</p>
          <h1 className="font-display text-xl font-bold mt-1">HOURS OF PLAY</h1>
          <p className="text-sm text-dim mt-2">登入以建立你的英雄角色卡</p>
        </div>

        {status === "sent" ? (
          <p className="text-sm text-center text-[var(--color-success)]">
            登入連結已寄到 {email}，請到信箱點擊連結完成登入。
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            {status === "error" && (
              <p className="text-xs text-[var(--color-danger)]">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[#04121f] font-bold text-sm hover:brightness-110 disabled:opacity-50"
            >
              {status === "sending" ? "傳送中……" : "取得登入連結"}
            </button>
          </form>
        )}

        <Link href="/" className="block text-center text-xs text-dim hover:text-[var(--color-accent)]">
          ← 回首頁
        </Link>
      </div>
    </div>
  );
}
