import type { PyramidData } from "@/lib/heroStatus";

const TalentPyramid = ({ title, data }: { title: string; data: PyramidData }) => {
  const hasData = Boolean(data.edge) || data.ring.length > 0 || data.base.length > 0;

  return (
    <div className="panel p-5 min-w-0 space-y-4">
      <p className="font-display text-xs text-dim tracking-widest">{title}</p>
      {!hasData ? (
        <p className="text-sm text-dim text-center py-6">尚未填寫</p>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <svg
            viewBox="0 0 200 140"
            className="w-full max-w-[220px]"
            role="img"
            aria-label={`${title}金字塔：王牌 ${data.edge ?? "無"}，戒指 ${data.ring.length} 項，基座 ${data.base.length} 項`}
          >
            <title>{title}</title>
            <polygon points="100,10 130,60 70,60" fill="var(--color-gold)" fillOpacity={0.85} />
            <polygon points="70,60 130,60 160,100 40,100" fill="var(--color-accent)" fillOpacity={0.55} />
            <polygon points="40,100 160,100 185,135 15,135" fill="var(--color-accent-2)" fillOpacity={0.3} />
          </svg>
          <div className="w-full min-w-0 space-y-3 text-sm">
            {data.edge && (
              <div>
                <p className="text-xs font-display star">王牌 EDGE</p>
                <p className="text-dim break-words">{data.edge}</p>
              </div>
            )}
            {data.ring.length > 0 && (
              <div>
                <p className="text-xs font-display" style={{ color: "var(--color-accent)" }}>
                  戒指 RING
                </p>
                <p className="text-dim break-words">{data.ring.join("、")}</p>
              </div>
            )}
            {data.base.length > 0 && (
              <div>
                <p className="text-xs font-display" style={{ color: "var(--color-accent-2)" }}>
                  基座 BASE
                </p>
                <p className="text-dim break-words">{data.base.join("、")}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentPyramid;
