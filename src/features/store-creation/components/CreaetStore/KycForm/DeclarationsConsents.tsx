"use client";

import { KycSchema } from "@/src/validation/CreateStoreSchemas";
import { FieldErrors, Path, UseFormSetValue } from "react-hook-form";
import CustomCheckbox from "./CustomCheckbox";

type Consents = KycSchema["consents"];

export default function DeclarationsConsents({
  consents,
  updateConsents,
  setValue,
  errors,
}: {
  consents: Consents;
  updateConsents: (c: Consents) => void;
  setValue: UseFormSetValue<KycSchema>;
  errors?: FieldErrors<KycSchema>;
}) {
  function getNestedErrorMessage(path: (keyof KycSchema | string)[]) {
    if (!errors) return undefined;
    let cur: unknown = errors as unknown;
    for (const p of path) {
      if (!cur || typeof cur !== "object") return undefined;
      cur = (cur as Record<string, unknown>)[p as string];
    }
    if (!cur || typeof cur !== "object") return undefined;
    const msg = (cur as Record<string, unknown>).message;
    return typeof msg === "string" ? msg : undefined;
  }

  function handleChange(key: keyof Consents, value: boolean) {
    const name = `consents.${String(key)}` as Path<KycSchema>;
    setValue(name, value as never, {
      shouldDirty: true,
      shouldTouch: true,
    });
    updateConsents({ ...consents, [key]: value });
  }

  const infoCorrectMsg = getNestedErrorMessage(["consents", "infoCorrect"]);
  const identityMsg = getNestedErrorMessage(["consents", "identityScreening"]);
  const termsMsg = getNestedErrorMessage(["consents", "terms"]);

  return (
    <div className="bg-[#FBFBFC] border border-[#F1F1F2] rounded-md p-4">
      <div className="text-sm font-medium mb-2">Declarations & Consents</div>
      <div className="space-y-2">
        <div>
          <CustomCheckbox
            checked={!!consents.infoCorrect}
            onChange={(v) => handleChange("infoCorrect", v)}
            label="I confirm the information is true and complete *"
            required
          />
          {infoCorrectMsg && (
            <p className="text-[11px] text-red-500 mt-1" role="alert">
              {infoCorrectMsg}
            </p>
          )}
        </div>

        <div>
          <CustomCheckbox
            checked={!!consents.identityScreening}
            onChange={(v) => handleChange("identityScreening", v)}
            label="I consent to identity and sanctions screening *"
            required
          />
          {identityMsg && (
            <p className="text-[11px] text-red-500 mt-1" role="alert">
              {identityMsg}
            </p>
          )}
        </div>

        <div>
          <CustomCheckbox
            checked={!!consents.terms}
            onChange={(v) => handleChange("terms", v)}
            label={"I accept the platform's Terms & Policies *"}
            required
          />
          {termsMsg && (
            <p className="text-[11px] text-red-500 mt-1" role="alert">
              {termsMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
