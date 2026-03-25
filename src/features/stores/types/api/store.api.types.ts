export type ApiStore = {
  id: number;
  name: string;
  description: string;
  logo_url: string;
  banner_url: string;

  phone: string;
  store_phone: string;
  email: string;
  store_email: string | boolean;

  street1: string;
  street2: string;
  city: string;
  state: string;
  state_id: number | null;
  state_code: string;
  zip: string;

  country: string;
  country_id: number | null;
  country_code: string;

  store_address: string;
  is_active: boolean;
  min_order_amount: number;

  seller_user_id: number | null;
  seller_name: string;
  seller_email: string | boolean;

  bank_details: unknown;
  kyc_verification: unknown;
};

export type ApiStoresListResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    stores: ApiStore[];
    total: number;
    limit: number;
    offset: number;
  };
  timestamp: string;
};
