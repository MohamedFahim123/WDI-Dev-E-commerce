"use server";

import { getAuthTokenFromCookieServer } from "@/src/lib/authCookies";
import { fetchApi } from "@/src/lib/fetchApi";
import type {
  BackendErrors,
  CreateStoreActionState,
  CreateStorePayload,
  CreateStoreResponseData,
} from "@/src/types/createStore.types";
import { z } from "zod";

const storeInfoSchema = z.object({
  nameEn: z.string().min(3).max(60),
  nameAr: z.string().min(3).max(60),
  phone: z.string().min(5),
  email: z.string().email(),
  description: z.string().min(5).max(500),
});

const addressSchema = z.object({
  city: z.string().min(1),
  region: z.string().min(1),
  street: z.string().min(1),
  unit: z.string().optional(),
  postal: z.string().min(1),
});

function normalizeToISODate(input: string): string | null {
  const v = String(input ?? "").trim();
  if (!v) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;

  const m = v.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
  if (m) {
    const dd = Number(m[1]);
    const mon = m[2].toLowerCase();
    const yyyy = Number(m[3]);

    const months: Record<string, number> = {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12,
    };

    const mm = months[mon];
    if (!mm) return null;

    const iso = `${String(yyyy).padStart(4, "0")}-${String(mm).padStart(
      2,
      "0"
    )}-${String(dd).padStart(2, "0")}`;

    const d = new Date(iso + "T00:00:00Z");
    if (Number.isNaN(d.getTime())) return null;
    return iso;
  }

  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

const dateISO = z
  .string()
  .min(1)
  .transform((val, ctx) => {
    const iso = normalizeToISODate(val);
    if (!iso) {
      ctx.addIssue({ code: "custom", message: "Invalid date format" });
      return z.NEVER;
    }
    return iso;
  });

const kycSchemaServer = z
  .object({
    kycType: z.enum(["individual", "business"]),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dob: dateISO,
    nationality: z.string().min(1),

    idType: z.string().min(1),
    idNumber: z.string().min(1),
    idIssueDate: dateISO,
    idExpiryDate: dateISO,
    idIssuingCountry: z.string().min(1),

    consents: z.object({
      infoCorrect: z
        .boolean()
        .refine((v) => v === true, { message: "Required" }),
      identityScreening: z
        .boolean()
        .refine((v) => v === true, { message: "Required" }),
      terms: z.boolean().refine((v) => v === true, { message: "Required" }),
    }),
  })
  .superRefine((data, ctx) => {
    const dob = new Date(data.dob + "T00:00:00Z");
    const issue = new Date(data.idIssueDate + "T00:00:00Z");
    const expiry = new Date(data.idExpiryDate + "T00:00:00Z");

    if (dob.getTime() >= Date.now()) {
      ctx.addIssue({
        code: "custom",
        path: ["dob"],
        message: "Date of birth must be in the past",
      });
    }

    if (expiry.getTime() <= issue.getTime()) {
      ctx.addIssue({
        code: "custom",
        path: ["idExpiryDate"],
        message: "Expiry date must be after issue date",
      });
    }
  });

const payoutSchema = z.object({
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

function zodErrorsToMap(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

async function fileToBase64(file: File): Promise<string> {
  const ab = await file.arrayBuffer();
  return Buffer.from(ab).toString("base64");
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function extractBackendErrors(res: unknown): BackendErrors | undefined {
  if (!isRecord(res)) return undefined;

  const data = res["data"];
  if (isRecord(data) && isRecord(data["errors"])) {
    return data["errors"] as BackendErrors;
  }

  if (isRecord(res["errors"])) {
    return res["errors"] as BackendErrors;
  }

  return undefined;
}

function backendErrorsToFieldMap(res: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  const errorsObj = extractBackendErrors(res);
  if (!errorsObj) return out;

  for (const [k, v] of Object.entries(errorsObj)) {
    const msg = Array.isArray(v)
      ? String(v[0] ?? "")
      : typeof v === "string"
      ? v
      : isRecord(v) && typeof v["message"] === "string"
      ? String(v["message"])
      : "";

    if (!msg) continue;

    const mappedKey =
      k === "name"
        ? "nameEn"
        : k === "name_ar"
        ? "nameAr"
        : k === "street1"
        ? "street"
        : k === "state"
        ? "region"
        : k;

    out[mappedKey] = msg;
  }

  return out;
}

const CURRENCY_TO_ID: Record<string, number> = {
  AED: 1,
  USD: 2,
  EUR: 3,
};

async function normalizeWizardToBackendPayload(args: {
  storeInfo: z.infer<typeof storeInfoSchema>;
  addressInfo: z.infer<typeof addressSchema>;
  kycInfo: z.infer<typeof kycSchemaServer>;
  payoutInfo: z.infer<typeof payoutSchema>;
  files: {
    idFront: File;
    idBack: File;
    selfie: File;
    proofOfAddress: File;
  };
}): Promise<CreateStorePayload> {
  const { storeInfo, addressInfo, kycInfo, payoutInfo, files } = args;

  const [idFrontB64, idBackB64, selfieB64, proofB64] = await Promise.all([
    fileToBase64(files.idFront),
    fileToBase64(files.idBack),
    fileToBase64(files.selfie),
    fileToBase64(files.proofOfAddress),
  ]);

  const currencyId = CURRENCY_TO_ID[payoutInfo.currency] ?? 1;

  const payload: CreateStorePayload = {
    name: storeInfo.nameEn,
    description: storeInfo.description,
    phone: storeInfo.phone,
    email: storeInfo.email,

    street1: addressInfo.unit
      ? `${addressInfo.street}, ${addressInfo.unit}`
      : addressInfo.street,
    city: addressInfo.city,
    state: addressInfo.region,

    kyc_verification: {
      kyc_type: kycInfo.kycType,
      first_name: kycInfo.firstName,
      last_name: kycInfo.lastName,
      date_of_birth: kycInfo.dob,
      nationality: kycInfo.nationality,

      id_type: kycInfo.idType,
      id_number: kycInfo.idNumber,
      id_issue_date: kycInfo.idIssueDate,
      id_expiry_date: kycInfo.idExpiryDate,
      id_issuing_country: kycInfo.idIssuingCountry,

      id_front_image: idFrontB64,
      id_back_image: idBackB64,
      selfie_image: selfieB64,
      address_proof_image: proofB64,
    },

    bank_details: {
      acc_holder_name: payoutInfo.holderName,
      bank_name: payoutInfo.bankName,
      bank_country: payoutInfo.bankCountry,
      currency_id: currencyId,

      account_number: payoutInfo.accountNumber ?? "",
      bic_code: payoutInfo.swift ?? "",
      branch_name: payoutInfo.branch ?? "",
      branch_code: payoutInfo.branchCode ?? "",
      bank_address: payoutInfo.address ?? "",
      iban_number: payoutInfo.iban ?? "",
    },
  };

  return payload;
}

export async function createStoreAction(
  prevState: CreateStoreActionState,
  formData: FormData
): Promise<CreateStoreActionState> {
  try {
    const storeInfoRaw = JSON.parse(String(formData.get("storeInfo") ?? "{}"));
    const addressRaw = JSON.parse(String(formData.get("addressInfo") ?? "{}"));
    const kycRaw = JSON.parse(String(formData.get("kycInfo") ?? "{}"));
    const payoutRaw = JSON.parse(String(formData.get("payoutInfo") ?? "{}"));

    const idFront = formData.get("idFront");
    const idBack = formData.get("idBack");
    const selfie = formData.get("selfie");
    const proofOfAddress = formData.get("proofOfAddress");

    const storeParsed = storeInfoSchema.safeParse(storeInfoRaw);
    const addressParsed = addressSchema.safeParse(addressRaw);
    const kycParsed = kycSchemaServer.safeParse(kycRaw);
    const payoutParsed = payoutSchema.safeParse(payoutRaw);

    const fieldErrors: Record<string, string> = {};
    if (!storeParsed.success)
      Object.assign(fieldErrors, zodErrorsToMap(storeParsed.error));
    if (!addressParsed.success)
      Object.assign(fieldErrors, zodErrorsToMap(addressParsed.error));
    if (!kycParsed.success)
      Object.assign(fieldErrors, zodErrorsToMap(kycParsed.error));
    if (!payoutParsed.success)
      Object.assign(fieldErrors, zodErrorsToMap(payoutParsed.error));

    if (!(idFront instanceof File)) fieldErrors["idFront"] = "Required";
    if (!(idBack instanceof File)) fieldErrors["idBack"] = "Required";
    if (!(selfie instanceof File)) fieldErrors["selfie"] = "Required";
    if (!(proofOfAddress instanceof File))
      fieldErrors["proofOfAddress"] = "Required";

    if (Object.keys(fieldErrors).length > 0) {
      return {
        ok: false,
        message: "Please fix the highlighted fields.",
        fieldErrors,
      };
    }

    if (
      !storeParsed.success ||
      !addressParsed.success ||
      !kycParsed.success ||
      !payoutParsed.success ||
      !(idFront instanceof File) ||
      !(idBack instanceof File) ||
      !(selfie instanceof File) ||
      !(proofOfAddress instanceof File)
    ) {
      return {
        ok: false,
        message: "Invalid submission.",
        fieldErrors: { _form: "Invalid submission." },
      };
    }

    const payload = await normalizeWizardToBackendPayload({
      storeInfo: storeParsed.data,
      addressInfo: addressParsed.data,
      kycInfo: kycParsed.data,
      payoutInfo: payoutParsed.data,
      files: { idFront, idBack, selfie, proofOfAddress },
    });

    const token = await getAuthTokenFromCookieServer();

    const res = await fetchApi<CreateStoreResponseData>("store/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cache: "no-store",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!res.success) {
      const mapped = backendErrorsToFieldMap(res);
      return {
        ok: false,
        message: res.message || "Store submission failed.",
        errorCode: res.error_code,
        fieldErrors: {
          ...mapped,
          _form: res.message || "Store submission failed.",
        },
      };
    }

    const storeId = res.data?.store_id ?? res.data?.id;

    return {
      ok: true,
      message: res.message || "Submitted successfully.",
      storeId,
      fieldErrors: {},
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Unexpected error while submitting store.";
    return { ok: false, message, fieldErrors: prevState?.fieldErrors ?? {} };
  }
}
