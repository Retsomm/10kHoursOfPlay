import type { Tier } from "@/types/content";
import { TIER_LABEL, TIER_STARS } from "@/types/content";
import StarRating from "./StarRating";
import LockIcon from "./LockIcon";

export default function LockedTierPanel({ tier }: { tier: Tier }) {
  return (
    <div className="panel p-6 opacity-60">
      <div className="flex items-center gap-2">
        <span className="font-display text-sm text-dim">{TIER_LABEL[tier]}</span>
        <StarRating filled={TIER_STARS[tier]} />
      </div>
      <div className="mt-4 flex items-center gap-2 text-dim text-sm">
        <LockIcon className="w-4 h-4" />
        完成上一個層級即可解鎖
      </div>
    </div>
  );
}
