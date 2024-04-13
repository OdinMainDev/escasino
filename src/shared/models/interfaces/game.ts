export interface IGame {
  id: number;
  name: string;
  game_provider: string;
  has_freerounds: boolean;
  desktop_enabled: boolean;
  mobile_enabled: boolean;
  image: string;
  data: IGameData;
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
