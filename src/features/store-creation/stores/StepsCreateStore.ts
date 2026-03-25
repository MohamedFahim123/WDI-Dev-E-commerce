import { create } from "zustand";

export type StoreInfo = {
  nameEn: string;
  nameAr: string;
  phone: string;
  email: string;
  description: string;
};

export type AddressInfo = {
  city: string;
  region: string;
  street: string;
  unit?: string;
  postal: string;
};

export type KycInfo = {
  kycType: "individual" | "business";

  firstName: string;
  lastName: string;
  dob: string;
  nationality: string;

  idType: string;
  idNumber: string;
  idIssueDate: string;
  idExpiryDate: string;
  idIssuingCountry: string;

  idFront?: File | null;
  idBack?: File | null;
  selfie?: File | null;
  proofOfAddress?: File | null;

  consents: {
    infoCorrect: boolean;
    identityScreening: boolean;
    terms: boolean;
  };
};

export type PayoutInfo = {
  holderName: string;
  bankName: string;
  bankCountry: string;
  currency: string;
  accountNumber?: string;
  swift?: string;
  branch?: string;
  branchCode?: string;
  address?: string;
  iban?: string;
};

type CreateStoreState = {
  step: number;
  storeInfo: StoreInfo;
  addressInfo: AddressInfo;
  kycInfo: KycInfo;
  payoutInfo: PayoutInfo;

  setStep: (n: number) => void;
  updateStoreInfo: (v: Partial<StoreInfo>) => void;
  updateAddressInfo: (v: Partial<AddressInfo>) => void;
  updateKycInfo: (v: Partial<KycInfo>) => void;
  updatePayoutInfo: (v: Partial<PayoutInfo>) => void;
  reset: () => void;
};

export const useCreateStore = create<CreateStoreState>((set) => ({
  step: 1,

  storeInfo: {
    nameEn: "",
    nameAr: "",
    phone: "",
    email: "",
    description: "",
  },

  addressInfo: {
    city: "",
    region: "",
    street: "",
    unit: "",
    postal: "",
  },

  kycInfo: {
    kycType: "individual",
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    idType: "",
    idNumber: "",
    idIssueDate: "",
    idExpiryDate: "",
    idIssuingCountry: "",

    idFront: null,
    idBack: null,
    selfie: null,
    proofOfAddress: null,

    consents: {
      infoCorrect: false,
      identityScreening: false,
      terms: false,
    },
  },

  payoutInfo: {
    holderName: "",
    bankName: "",
    bankCountry: "",
    currency: "",
    iban: "",
    accountNumber: "",
    swift: "",
    branch: "",
    branchCode: "",
    address: "",
  },

  setStep: (n) => set({ step: n }),

  updateStoreInfo: (v) => set((s) => ({ storeInfo: { ...s.storeInfo, ...v } })),

  updateAddressInfo: (v) =>
    set((s) => ({ addressInfo: { ...s.addressInfo, ...v } })),

  updateKycInfo: (v) => set((s) => ({ kycInfo: { ...s.kycInfo, ...v } })),

  updatePayoutInfo: (v) =>
    set((s) => ({ payoutInfo: { ...s.payoutInfo, ...v } })),

  reset: () =>
    set((s) => ({
      ...s,
      step: 1,
      storeInfo: {
        nameEn: "",
        nameAr: "",
        phone: "",
        email: "",
        description: "",
      },
      addressInfo: { city: "", region: "", street: "", unit: "", postal: "" },
      kycInfo: {
        kycType: "individual",
        firstName: "",
        lastName: "",
        dob: "",
        nationality: "",
        idType: "",
        idNumber: "",
        idIssueDate: "",
        idExpiryDate: "",
        idIssuingCountry: "",
        idFront: null,
        idBack: null,
        selfie: null,
        proofOfAddress: null,
        consents: {
          infoCorrect: false,
          identityScreening: false,
          terms: false,
        },
      },
      payoutInfo: {
        holderName: "",
        bankName: "",
        bankCountry: "",
        currency: "",
        iban: "",
        accountNumber: "",
        swift: "",
        branch: "",
        branchCode: "",
        address: "",
      },
    })),
}));
