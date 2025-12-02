"use client";

import { useState } from "react";

export default function PreviewTab() {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-[#111827]">Preview</h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[#E5E7EB] p-3">
          <div className="text-xs text-[#6B7280] mb-2">View Mode *</div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label
              className={`flex-1 rounded-md border p-3 ${
                mode === "desktop"
                  ? "border-[#7C3BED] bg-[#FBF7FF]"
                  : "bg-white"
              }`}
            >
              <input
                type="radio"
                name="view"
                checked={mode === "desktop"}
                onChange={() => setMode("desktop")}
                className="hidden"
              />
              <div className="text-sm font-medium">Desktop</div>
              <div className="text-xs text-[#6B7280]">For personal sellers</div>
            </label>

            <label
              className={`flex-1 rounded-md border p-3 ${
                mode === "mobile" ? "border-[#7C3BED] bg-[#FBF7FF]" : "bg-white"
              }`}
            >
              <input
                type="radio"
                name="view"
                checked={mode === "mobile"}
                onChange={() => setMode("mobile")}
                className="hidden"
              />
              <div className="text-sm font-medium">Mobile</div>
              <div className="text-xs text-[#6B7280]">
                For registered businesses
              </div>
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-[#7C3BED] p-3 flex items-center justify-center">
          <div className="w-full">
            <div className="h-28 bg-[#F3F4F6] rounded mb-3"></div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-white rounded-full border flex items-center justify-center">
                Logo
              </div>
              <div>
                <div className="text-sm font-semibold">Store Name</div>
                <div className="text-xs text-[#6B7280]">4.8 (120 reviews)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button className="inline-flex items-center justify-center rounded-md bg-[#7C3BED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6D28D9]">
          Save
        </button>
      </div>
    </div>
  );
}
