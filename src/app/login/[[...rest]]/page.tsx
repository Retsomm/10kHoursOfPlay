import { SignIn } from "@clerk/nextjs";
import { clerkConfigured } from "@/lib/env";
import SetupNotice from "@/components/SetupNotice";

const LoginPage = () => {
  if (!clerkConfigured()) return <SetupNotice />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 min-w-0">
      <div className="text-center">
        <p className="font-display text-sm star tracking-widest">10,000</p>
        <h1 className="font-display text-xl font-bold mt-1">HOURS OF PLAY</h1>
        <p className="text-sm text-dim mt-2">登入以建立你的英雄角色卡</p>
      </div>
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
  );
};

export default LoginPage;
