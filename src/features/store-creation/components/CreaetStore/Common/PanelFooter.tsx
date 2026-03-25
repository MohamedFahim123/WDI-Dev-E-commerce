import * as React from "react";

export default function PanelFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 border-t border-[#F1F1F2] ${className}`}>{children}</div>;
}
