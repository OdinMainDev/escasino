export interface IGame {
  id: number;
  name: string;
  game_provider: string;
  has_bonus: boolean;
  has_no_deposit_bonus: boolean;
  desktop_enabled: boolean;
  mobile_enabled: boolean;
  image: string;
  data: IGameData;
  system_name: string;
}

export interface IGameData {
  texts?: Text[];
  demo_disabled: boolean;
}

export interface Text {
  language: string;
  key: string;
  value: string;
}
