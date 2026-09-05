"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/dashboard/profile", label: "個人" },
  { href: "/quests", label: "任務" },
  { href: "/dashboard/journey", label: "旅程" },
];

const DashboardTabs = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 border-b border-[var(--color-border)] overflow-x-auto">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 text-sm font-display shrink-0 border-b-2 -mb-px transition ${
              active
                ? "border-[var(--color-accent)] text-[var(--color-accent)] glow-accent"
                : "border-transparent text-dim hover:text-[var(--color-text)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardTabs;
