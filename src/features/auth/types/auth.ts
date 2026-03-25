export interface AuthUser {
  user_id: number;
  name: string;
  email: string;
  phone?: string | null;
  countryCode?: string | null;
  company_id?: number;
  company_name?: string;
  token: string;
  user_type: "seller" | "buyer";
  city: string;
  country_id: number | null;
  country_name: string;
  id: number;
  state_id: number | null;
  state_name: string;
  street: string;
  street2: string;
  zip: string;
  image: string;
}

export interface AuthResponse {
  user: AuthUser;
}
