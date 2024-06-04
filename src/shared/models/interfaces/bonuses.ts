export interface IBonus {
  id: number;
  currency: string;
  status: number;
  data: IBonusData;
  created_at: number;
  expired_at: number;
}

export interface IBonusData {
  bonuses_list: IBonusesList[];
}

export interface IBonusesList {
  type: string;
  id: number;
}

export interface IBonusConfigurator {
  currency: string;
  bet_amount: number;
}

export interface IBonusTemplate {
  id: number;
  spins_count: number;
  bonus_percent: number;
  game_ids: number[];
  bet_list: IBetList[];
  configurator: IBonusConfigurator;
  life_time: number;
  is_cancel: boolean;
  is_real_money_only: boolean;
  wager: number;
}

export interface IBetList {
  currency: string;
  min_amount: number;
  max_amount: number;
  max_bet_amount: number;
  max_win_x: number;
  max_win: number;
}
