import { IGame } from '@/entities/game';
import axios from 'axios';

export const homeGamesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/games/home`;
};

export interface IResponseHomeGames {
  games: IGame[] | null;
  status: number | null;
}

export const getHomeGamesApi = async (): Promise<IResponseHomeGames> => {
  const { data, status } = await axios.get<{ data: IGame[] }>(homeGamesApi(), {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseHomeGames = {
    games: data.data,
    status: status,
  };
  return resp;
};
