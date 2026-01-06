import { z } from "zod";

export const storeInfoSchema = z.object({
  nameEn: z.string().min(3, "Enter store name (3+ chars)").max(60),
  nameAr: z.string().min(3, "Enter store name in Arabic").max(60),
  phone: z
    .string()
    .min(5, "Enter phone number")
    .refine((v) => /^\+?[0-9\s\-()]+$/.test(v), "Invalid phone format"),
  email: z.string().email("Enter a valid email"),
  description: z
    .string()
    .min(5, "Enter a short description (5+ chars)")
    .max(500),
});
export type StoreInfoSchema = z.infer<typeof storeInfoSchema>;

export const addressSchema = z.object({
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region/State is required"),
  street: z.string().min(1, "Street is required"),
  unit: z.string().optional(),
  postal: z.string().min(1, "Postal/ZIP is required"),
});
export type AddressSchema = z.infer<typeof addressSchema>;

/**
 * IMPORTANT:
 * Your Zustand KycInfo uses File | null,
 * so we must allow null in RHF/Zod too to avoid TS defaultValues errors.
 */
const fileOrNull = z.union([z.instanceof(File), z.null()]).optional();

const consentsSchema = z.object({
  infoCorrect: z
    .boolean()
    .refine((v) => v === true, { message: "Confirm information is true" }),
  identityScreening: z
    .boolean()
    .refine((v) => v === true, { message: "Consent required" }),
  terms: z
    .boolean()
    .refine((v) => v === true, { message: "You must accept terms" }),
});

export const kycSchema = z.object({
  kycType: z.enum(["individual", "business"], {
    message: "Select seller type",
  }),

  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),

  idType: z.string().min(1, "ID type is required"),
  idNumber: z.string().min(1, "ID number is required"),
  idIssueDate: z.string().min(1, "ID issue date is required"),
  idExpiryDate: z.string().min(1, "ID expiry date is required"),
  idIssuingCountry: z.string().min(1, "ID issuing country is required"),

  idFront: fileOrNull,
  idBack: fileOrNull,
  selfie: fileOrNull,
  proofOfAddress: fileOrNull,

  consents: consentsSchema,
});
export type KycSchema = z.infer<typeof kycSchema>;

export const payoutSchema = z.object({
  holderName: z.string().min(1, "Account holder name required"),
  bankName: z.string().min(1, "Bank name required"),
  bankCountry: z.string().min(1, "Bank country required"),
  currency: z.string().min(1, "Settlement currency required"),
  iban: z.string().optional(),
  accountNumber: z.string().optional(),
  swift: z.string().optional(),
  branch: z.string().optional(),
  branchCode: z.string().optional(),
  address: z.string().optional(),
});
export type PayoutSchema = z.infer<typeof payoutSchema>;
