import { z } from "zod";
import { useCreateStore } from "@/src/stores/StepsCreateStore";
import { StepId, zodErrorsToMap } from "@/src/lib/createStoreWizard";

export const storeInfoSchemaClient = z.object({
  nameEn: z.string().min(3).max(60),
  nameAr: z.string().min(3).max(60),
  phone: z.string().min(5),
  email: z.string().email(),
  description: z.string().min(5).max(500),
});

export const addressSchemaClient = z.object({
  city: z.string().min(1),
  region: z.string().min(1),
  street: z.string().min(1),
  unit: z.string().optional(),
  postal: z.string().min(1),
});

export const kycSchemaClient = z.object({
  kycType: z.enum(["individual", "business"]),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dob: z.string().min(1),
  nationality: z.string().min(1),

  idType: z.string().min(1),
  idNumber: z.string().min(1),
  idIssueDate: z.string().min(1),
  idExpiryDate: z.string().min(1),
  idIssuingCountry: z.string().min(1),

  consents: z.object({
    infoCorrect: z.boolean().refine((v) => v === true, { message: "Required" }),
    identityScreening: z
      .boolean()
      .refine((v) => v === true, { message: "Required" }),
    terms: z.boolean().refine((v) => v === true, { message: "Required" }),
  }),
});

export const payoutSchemaClient = z.object({
  holderName: z.string().min(1),
  bankName: z.string().min(1),
  bankCountry: z.string().min(1),
  currency: z.string().min(1),
  iban: z.string().optional(),
  accountNumber: z.string().optional(),
  swift: z.string().optional(),
  branch: z.string().optional(),
  branchCode: z.string().optional(),
  address: z.string().optional(),
});

export function validateStepClient(step: StepId): Record<string, string> {
  const { storeInfo, addressInfo, kycInfo, payoutInfo } =
    useCreateStore.getState();

  const out: Record<string, string> = {};

  if (step === 1) {
    const parsed = storeInfoSchemaClient.safeParse(storeInfo);
    if (!parsed.success) Object.assign(out, zodErrorsToMap(parsed.error));
    return out;
  }

  if (step === 2) {
    const parsed = addressSchemaClient.safeParse(addressInfo);
    if (!parsed.success) Object.assign(out, zodErrorsToMap(parsed.error));
    return out;
  }

  if (step === 3) {
    const parsed = kycSchemaClient.safeParse(kycInfo);
    if (!parsed.success) Object.assign(out, zodErrorsToMap(parsed.error));

    if (!(kycInfo.idFront instanceof File)) out["idFront"] = "Required";
    if (!(kycInfo.idBack instanceof File)) out["idBack"] = "Required";
    if (!(kycInfo.selfie instanceof File)) out["selfie"] = "Required";
    if (!(kycInfo.proofOfAddress instanceof File))
      out["proofOfAddress"] = "Required";

    return out;
  }

  const parsed = payoutSchemaClient.safeParse(payoutInfo);
  if (!parsed.success) Object.assign(out, zodErrorsToMap(parsed.error));
  return out;
}

export function validateAllClient(): Record<string, string> {
  return {
    ...validateStepClient(1),
    ...validateStepClient(2),
    ...validateStepClient(3),
    ...validateStepClient(4),
  };
}
