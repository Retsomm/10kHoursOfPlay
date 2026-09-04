import type { ReactNode } from "react";
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
      <div className="flex items-start justify-between gap-4">
        <p className="font-display text-sm text-dim">10,000 HOURS OF PLAY</p>
        <div className="flex items-center gap-4">
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
