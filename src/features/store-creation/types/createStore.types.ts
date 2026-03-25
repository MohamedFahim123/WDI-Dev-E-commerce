export type CreateStoreActionState = {
  ok: boolean;
  message?: string;
  errorCode?: string;
  storeId?: string | number;
  fieldErrors: Record<string, string>;
};

export const initialCreateStoreState: CreateStoreActionState = {
  ok: false,
  fieldErrors: {},
};

export type CreateStoreResponseData = {
  store_id?: string | number;
  id?: string | number;
  errors?: Record<string, unknown>;
};

export type BackendErrors = Record<string, unknown>;

export type CreateStorePayload = {
  name: string;
  description: string;
  phone: string;
  email: string;
  street1: string;
  city: string;
  state: string;
  kyc_verification: {
    kyc_type: "individual" | "business";
    first_name: string;
    last_name: string;
    date_of_birth: string;
    nationality: string;
    id_type: string;
    id_number: string;
    id_issue_date: string;
    id_expiry_date: string;
    id_issuing_country: string;
    id_front_image: string;
    id_back_image: string;
    selfie_image: string;
    address_proof_image: string;
  };
  bank_details: {
    acc_holder_name: string;
    bank_name: string;
    bank_country: string;
    currency_id: number;
    account_number: string;
    bic_code: string;
    branch_name: string;
    branch_code: string;
    bank_address: string;
    iban_number: string;
  };
};
