import type { ReactNode } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import SignOutButton from "./SignOutButton";
import DashboardTabs from "./DashboardTabs";

const DashboardShell = ({
  children,
  maxWidth = "max-w-5xl",
}: {
  children: ReactNode;
  maxWidth?: string;
}) => {
  return (
    <div className={`${maxWidth} mx-auto px-6 py-10 space-y-8 min-w-0`}>
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 min-w-0 text-dim hover:text-[var(--color-accent)] transition"
        >
          <img
            src="/brand/logo-mark.svg"
            alt=""
            width={26}
            height={26}
            className="shrink-0 drop-shadow-[0_0_8px_rgba(56,189,248,0.55)]"
          />
          <span className="font-pixel text-[10px] tracking-[0.1em] truncate">10,000 HOURS OF PLAY</span>
        </Link>
        <div className="flex items-center gap-4 shrink-0">
          <SignOutButton />
          <UserButton />
        </div>
      </div>
      <DashboardTabs />
      {children}
    </div>
  );
};

export default DashboardShell;
