import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import { clerkConfigured } from "@/lib/env";
import SetupNotice from "@/components/SetupNotice";

const LoginPage = async () => {
  if (!clerkConfigured()) return <SetupNotice />;

  // Clerk 的 <SignIn/> 自己偵測到已登入時也會導向別處，但那個流程走一輪
  // client-side redirect，中間會經過好幾秒沒有任何畫面（甚至繞回首頁）——
  // 在這裡直接用伺服器端 auth() 先判斷，已登入就直接跳轉，不讓 <SignIn/>
  // 有機會跑它自己那套慢吞吞的重新導向。
  const { userId } = await auth();
  if (userId) redirect("/dashboard/profile");

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 min-w-0"
      style={{ overflowX: "clip" }}
    >
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
        <SignIn
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: { width: "100%", maxWidth: "100%" },
              // cl-cardBox 是 cl-rootBox 底下、cl-card 外面那層真正決定版面寬度的容器，
              // 沒特別設過它就是預設寬度（貼著內容跟自己的內距撐出來的寬度，
              // 在窄螢幕上比我們自己的面板還寬）——這才是整體被往右擠的元兇，
              // 不是只設 card 就能連帶約束到它。
              cardBox: {
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
              },
              card: {
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                backgroundColor: "transparent",
                backgroundImage: "none",
                border: "none",
                boxShadow: "none",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
