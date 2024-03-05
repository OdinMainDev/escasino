export interface IGameData {
  demo_disabled: boolean;
  blocked_countries: string | null;
  allowed_countries: string | null;
}

export interface IGame {
  id: number;
  name: string;
  system_name: string;
  system_id: string;
  api_name: string;
  game_provider: string;
  has_freerounds: boolean;
  desktop_enabled: boolean;
  mobile_enabled: boolean;
  image: string | null;
  data: IGameData;
  game_data: null;
  created_at: number;
  updated_at: number;
}
