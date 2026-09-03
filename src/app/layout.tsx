import type { Metadata } from "next";
import { Orbitron, Noto_Sans_TC } from "next/font/google";
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

export const metadata: Metadata = {
  title: "10,000 Hours of Play",
  description: "把人生活成一場你能玩到通關的遊戲——建立你的英雄角色卡，記錄成長旅程。",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  const content = (
    <html
      lang="zh-Hant"
      className={`${orbitron.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
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
          colorForeground: "#e8f1fc",
          colorMutedForeground: "#8fa6c4",
          colorInput: "#060b18",
          colorInputForeground: "#e8f1fc",
        },
        elements: {
          socialButtonsBlockButton: {
            backgroundColor: "#12274a",
            borderColor: "#2f5d99",
            color: "#e8f1fc",
          },
          socialButtonsBlockButtonText: {
            color: "#e8f1fc",
          },
        },
      }}
    >
      {content}
    </ClerkProvider>
  );
};

export default RootLayout;
