import { SignIn } from "@clerk/nextjs";
import { clerkConfigured } from "@/lib/env";
import SetupNotice from "@/components/SetupNotice";

const LoginPage = () => {
  if (!clerkConfigured()) return <SetupNotice />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 min-w-0">
      <div className="flex flex-col items-center gap-2 text-center">
        <img
          src="/brand/logo-mark.svg"
          alt=""
          width={64}
          height={64}
          className="drop-shadow-[0_0_16px_rgba(56,189,248,0.5)]"
        />
        <p className="font-pixel text-xs star tracking-[0.24em]">10,000</p>
        <h1 className="font-display text-xl font-black glow-accent">HOURS OF PLAY</h1>
        <p className="text-sm text-dim mt-1">登入以建立你的英雄角色卡</p>
      </div>

      <div className="panel panel-glow w-full max-w-[420px] p-4 sm:p-7 overflow-hidden">
        <SignIn fallbackRedirectUrl="/dashboard" />
      </div>
    </div>
  );
};

export default LoginPage;
