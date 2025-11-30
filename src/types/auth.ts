export interface AuthUser {
  role: string;
  id: string;
  name?: string;
  email: string;
  phone?: string | null;
  countryCode?: string | null;
}

export interface AuthResponse {
  user: AuthUser;
}
