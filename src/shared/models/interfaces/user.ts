export interface IUser {
  username: string;
  email: string;
  phone: string;
  currency: string;
  data: Data;
  balance: Balance;
  balances: Balances[];
  pusher_id: string;
}

export interface Data {
  first_name: string;
  second_name: string;
  last_name: string;
  avatar: string;
  country: string;
  city: string;
  dob: number;
  address: string;
  zip: string;
  gender: string;
  promo_enabled: boolean;
  email_verified_at: number;
  phone_verified_at: number;
  documents_verified_at: number;
  created_at: number;
}

export interface Balance {
  currency: string;
  balance_real: number;
  balance_bonus: number;
  formatted_balance_real: number;
  formatted_balance_bonus: number;
  wager: number;
  formatted_wager: number;
}

export interface Balances {
  currency: string;
  balance_real: number;
  balance_bonus: number;
  formatted_balance_real: number;
  formatted_balance_bonus: number;
  wager: number;
  formatted_wager: number;
}
