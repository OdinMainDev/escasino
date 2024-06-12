export interface IBonus {
  id: number;
  currency: string;
  status: number;
  data: IBonusData;
  created_at: number;
  expired_at: number;
  bonus_template: IBonusTemplate;
}

export interface IBonusData {
  bonuses_list: IBonusesList[];
}

export interface IBonusesList {
  type: string;
  id: number;
  game_id: number;
}

export interface ISetActiveBonus {
  id: number;
  fid: string;
  games_ids: number[];
}

export interface IBonusConfigurator {
  currency: string;
  bet_amount: number;
}

export interface IBonusSetiings {
  currency: string;
  min_amount: number;
  max_amount: number;
  max_bet_amount: number;
  max_win_x: number;
  max_win: number;
}

export interface IBonusTemplate {
  id: number;
  spins_count: number;
  bonus_percent: number;
  bonus_settings: IBonusSetiings;
  game_ids: number[];
  bet_list: IBetList[];
  configurator: IBonusConfigurator;
  life_time: number;
  is_cancel: boolean;
  is_duplicatable: boolean;
  is_real_money_only: boolean;
  wager: number;
  meta: Meta;
}

export interface ICartBonusTemplate extends IBonusTemplate {
  game_id: number | null;
  type: 'freespins' | 'money';
  uuid: string;
}

export interface IBetList {
  currency: string;
  min_amount: number;
  max_amount: number;
  max_bet_amount: number;
  max_win_x: number;
  max_win: number;
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
