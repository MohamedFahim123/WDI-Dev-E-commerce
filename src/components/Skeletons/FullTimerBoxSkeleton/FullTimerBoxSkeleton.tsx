import React from "react";

function FullTimerBoxSkeleton({ bg }: { bg?: string }) {
  const boxBg = bg ? bg : "bg-[#A44603]";
  return (
    <div className="flex items-center gap-1">
      <div
        className={`${boxBg} px-2 py-1 rounded text-sm font-semibold min-w-[35px] text-center skeleton-shimmer`}
      />
      <span>:</span>
      <div
        className={`${boxBg} px-2 py-1 rounded text-sm font-semibold min-w-[35px] text-center skeleton-shimmer`}
      />
      <span>:</span>
      <div
        className={`${boxBg} px-2 py-1 rounded text-sm font-semibold min-w-[35px] text-center skeleton-shimmer`}
      />
    </div>
  );
}
export default React.memo(FullTimerBoxSkeleton);
