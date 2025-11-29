import * as React from "react";

export default function PanelHeader({
  icon,
  title,
  subtitle,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-5 border-b border-[#F1F1F2]">
      {icon}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle ? (
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
