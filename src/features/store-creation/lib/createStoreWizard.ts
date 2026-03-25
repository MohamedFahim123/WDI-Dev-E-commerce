import { z } from "zod";

export type StepId = 1 | 2 | 3 | 4;

export function fieldToStep(field: string): StepId {
  if (["nameEn", "nameAr", "phone", "email", "description"].includes(field))
    return 1;
  if (["city", "region", "street", "unit", "postal"].includes(field)) return 2;
  if (
    [
      "kycType",
      "firstName",
      "lastName",
      "dob",
      "nationality",
      "idType",
      "idNumber",
      "idIssueDate",
      "idExpiryDate",
      "idIssuingCountry",
      "idFront",
      "idBack",
      "selfie",
      "proofOfAddress",
      "consents.infoCorrect",
      "consents.identityScreening",
      "consents.terms",
    ].includes(field)
  )
    return 3;
  return 4;
}

export function pickErrorsForStep(
  all: Record<string, string>,
  step: StepId
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(all ?? {})) {
    if (!v) continue;
    if (fieldToStep(k) === step) out[k] = v;
  }
  return out;
}

export function minStepFromErrors(all: Record<string, string>): StepId | null {
  const keys = Object.keys(all ?? {}).filter((k) => !!all[k]);
  if (keys.length === 0) return null;

  let min: StepId = 4;
  for (const k of keys) {
    const s = fieldToStep(k);
    if (s < min) min = s;
  }
  return min;
}

export function stableErrorsVersion(obj: Record<string, string>) {
  const keys = Object.keys(obj ?? {}).sort();
  return keys.map((k) => `${k}:${obj[k] ?? ""}`).join("|");
}

export function replaceErrorsForStep(
  prev: Record<string, string>,
  step: StepId,
  nextForStep: Record<string, string>
) {
  const keep: Record<string, string> = {};
  for (const [k, v] of Object.entries(prev ?? {})) {
    if (fieldToStep(k) !== step) keep[k] = v;
  }
  return { ...keep, ...nextForStep };
}

export function zodErrorsToMap(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
