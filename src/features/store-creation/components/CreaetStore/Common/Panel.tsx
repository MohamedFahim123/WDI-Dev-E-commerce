import * as React from "react";

export default function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-[#E8E8EA] rounded-lg ${className}`}>
      {children}
    </div>
  );
}
