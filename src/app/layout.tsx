import type { Metadata, Viewport } from "next";
import { Orbitron, Noto_Sans_TC, Press_Start_2P, Share_Tech_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkConfigured } from "@/lib/env";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const notoSans = Noto_Sans_TC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "10,000 Hours of Play",
  description: "把人生活成一場你能玩到通關的遊戲——建立你的英雄角色卡，記錄成長旅程。",
  appleWebApp: {
    capable: true,
    title: "10K HP",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#050914",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  const content = (
    <html
      lang="zh-Hant"
      className={`${orbitron.variable} ${notoSans.variable} ${pressStart.variable} ${shareTechMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );

  if (!clerkConfigured()) return content;

  return (
    <ClerkProvider
      afterSignOutUrl="/login"
      appearance={{
        variables: {
          colorPrimary: "#38bdf8",
          colorPrimaryForeground: "#04121f",
          colorBackground: "#0d1b33",
          // colorNeutral 預設是 "black"（Clerk 官方文件：淺色主題該用黑、深色主題該用白），
          // 邊框／hover／彈窗遮罩等一大票顏色都是從它算出來的；沒設它，這些顏色會是
          // 「黑上疊黑」，在我們的深色背景上幾乎看不見（UserButton 選單文字就是這樣壞的）。
          colorNeutral: "#e8f1fc",
          colorForeground: "#e8f1fc",
          colorMutedForeground: "#8fa6c4",
          colorInput: "#060b18",
          colorInputForeground: "#e8f1fc",
        },
        elements: {
          // 只給一般卡片（登入頁自己包了 panel，這裡故意不設不透明背景，
          // 見 login 頁自己的 appearance 覆寫）跟 UserButton 彈出選單各自的樣式，
          // 不要在這裡把 card 設成透明——card 是共用 key，UserButton 的選單也吃得到，
          // 之前設成透明導致選單背景穿透看到後面頁面內容，文字看不清楚。
          card: {
            backgroundColor: "#0d1b33",
            backgroundImage: "linear-gradient(180deg, #0d1b33, #12274a)",
            border: "1px solid #2f5d99",
            boxShadow: "inset 0 0 0 1px rgba(56,189,248,.12), 0 12px 30px -12px rgba(0,0,0,.6)",
          },
          userButtonPopoverCard: {
            backgroundColor: "#0d1b33",
            backgroundImage: "linear-gradient(180deg, #0d1b33, #12274a)",
            border: "1px solid #2f5d99",
            boxShadow: "inset 0 0 0 1px rgba(56,189,248,.12), 0 12px 30px -12px rgba(0,0,0,.6)",
          },
          userButtonPopoverActionButtonText: {
            color: "#e8f1fc",
          },
          userButtonPopoverActionButtonIcon: {
            color: "#8fa6c4",
          },
          userButtonPopoverFooter: {
            backgroundColor: "transparent",
          },
          headerTitle: {
            wordBreak: "break-word",
          },
          socialButtonsBlockButton: {
            backgroundColor: "rgba(6, 11, 24, 0.6)",
            borderColor: "#2f5d99",
            color: "#e8f1fc",
          },
          socialButtonsBlockButtonText: {
            color: "#e8f1fc",
          },
          formButtonPrimary: {
            boxShadow: "0 0 0 1px rgba(56,189,248,.4), 0 0 24px -6px rgba(56,189,248,.75)",
          },
        },
      }}
    >
      {content}
    </ClerkProvider>
  );
};

export default RootLayout;
