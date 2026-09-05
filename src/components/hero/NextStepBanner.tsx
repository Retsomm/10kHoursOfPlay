import Link from "next/link";
import type { NextStepSuggestion } from "@/lib/nextStep";

const NextStepBanner = ({ suggestion }: { suggestion: NextStepSuggestion }) => {
  return (
    <div className="panel p-5 min-w-0 panel-glow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="min-w-0">
        <p className="font-pixel text-[10px] star">NEXT QUEST</p>
        <p className="mt-1 break-words">{suggestion.message}</p>
      </div>
      <Link href={suggestion.href} className="btn-primary rounded-lg px-4 py-2 text-sm shrink-0">
        {suggestion.cta}
      </Link>
    </div>
  );
};

export default NextStepBanner;
