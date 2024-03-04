export interface ISettings {
  languages: string[]
  currencies: string[]
  public: Public
  auth: Auth
  main_currency: string
  captcha_site_key: string
  profile: Profile
  bonus: Bonus
  affiliate: Affiliate
}

export interface Public {
  logo: string
  names: any
}

export interface Auth {
  login: Login
  register: Register
  reset: Reset
  social_vk: boolean
  social_ok: boolean
  social_fb: boolean
}

export interface Login {
  email: boolean
  remember: boolean
  captcha: boolean
  phone: boolean
}

export interface Register {
  email: boolean
  phone: boolean
  username: boolean
  full_name: boolean
  city: boolean
  dob: boolean
  address: boolean
  promo: boolean
  gender: boolean
  captcha: boolean
}

export interface Reset {
  email: boolean
  captcha: boolean
  phone: boolean
}

export interface Profile {
  user_can_change_data: boolean
  has_email: boolean
  has_phone: boolean
  has_username: boolean
  has_first_name: boolean
  has_second_name: boolean
  has_last_name: boolean
  has_country: boolean
  has_city: boolean
  has_address: boolean
  has_zip: boolean
  has_dob: boolean
  has_gender: boolean
  has_avatar: boolean
  has_promo: boolean
}

export interface Bonus {
  bonus_inactive_life_time: number
  max_avail_bonuses: number
  max_wager_per_deposit: number
  max_bonuses_per_deposit: number
  max_bonuses_freespins_per_deposit: number
  max_bonuses_money_per_deposit: number
  is_freespins_disabled: boolean
  is_money_disabled: boolean
  sum_values: boolean
}

export interface Affiliate {
  register: Register2
}

export interface Register2 {
  has_email: boolean
  has_phone: boolean
  has_username: boolean
  has_first_name: boolean
  has_second_name: boolean
  has_last_name: boolean
  has_country: boolean
  has_city: boolean
  has_address: boolean
  has_zip: boolean
  has_dob: boolean
  has_gender: boolean
  has_verifications: any
  need_company_name: boolean
  need_traffic_sources: boolean
  need_telegram: boolean
  need_skype: boolean
  need_whatsapp: boolean
}
