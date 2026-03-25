import * as React from "react";

export default function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm text-[#0F172A] bg-[#EEF6FF] border border-[#DBEAFE] p-3 rounded">
      {children}
    </div>
  );
}
