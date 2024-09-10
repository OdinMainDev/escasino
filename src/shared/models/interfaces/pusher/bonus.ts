export interface IBonusPusher {
  id: number;
  currency: string;
  status: number;
  data: Data;
  bonus_template: BonusTemplate[];
  created_at: number;
  expired_at: number;
}

export interface Data {
  bonuses_list: BonusesList[];
  is_cancel: boolean;
}

export interface BonusesList {
  type: string;
  id: number;
  game_id: number;
}

export interface BonusTemplate {
  id: number;
  spins_count: number;
  bonus_percent: number;
  game_ids: number[];
  bonus_settings: BonusSettings;
  life_time: number;
  is_cancel: boolean;
  is_real_money_only: boolean;
  is_duplicatable: boolean;
  wager: number;
  configurator: Configurator;
  meta: Meta;
  is_bonus_can_activate_always: boolean;
}

export interface BonusSettings {
  currency: string;
  min_amount: number;
  max_amount: number;
  max_bet_amount: number;
  max_win_x: number;
  max_win: number;
}

export interface Configurator {
  currency: string;
  bet_amount: number;
}

export interface Meta {
  texts: Text[];
  image: string;
}

export interface Text {
  language: string;
  key: string;
  value: string;
}
