import Link from "next/link";
import type { AllianceContact } from "@/lib/heroStatus";

const RELATIONSHIP_LABEL: Record<string, string> = {
  faction: "陣營 Faction",
  guild: "公會 Guild",
  party: "隊伍 Party",
  partnership: "夥伴關係 Partnership",
};

const GROUPS = ["faction", "guild", "party", "partnership"];

const AllianceRoster = ({ contacts, chapterHref }: { contacts: AllianceContact[]; chapterHref: string }) => {
  if (contacts.length === 0) {
    return (
      <div className="panel p-5 text-center space-y-2">
        <p className="font-display text-xs text-dim tracking-widest">聯盟名冊</p>
        <p className="text-sm text-dim">尚未填寫</p>
        <Link href={chapterHref} className="inline-block text-xs text-[var(--color-accent)] hover:underline">
          前往第6章建立你的聯盟 →
        </Link>
      </div>
    );
  }

  return (
    <div className="panel p-5 min-w-0 space-y-4">
      <p className="font-display text-xs text-dim tracking-widest">聯盟名冊</p>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))]">
        {GROUPS.map((groupKey) => {
          const group = contacts.filter((c) => c.relationship === groupKey);
          if (group.length === 0) return null;
          return (
            <div key={groupKey} className="min-w-0">
              <p className="text-xs font-display" style={{ color: "var(--color-accent)" }}>
                {RELATIONSHIP_LABEL[groupKey] ?? groupKey}
              </p>
              <ul className="mt-1 space-y-1 text-sm text-dim break-words">
                {group.map((c, i) => (
                  <li key={i}>
                    {c.name}
                    {c.note && <span className="text-xs"> — {c.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllianceRoster;
