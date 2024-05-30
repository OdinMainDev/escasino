import { IGame } from '@/shared/models/interfaces/game';
import axios from 'axios';

export const gamesAllApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/games/all`;
};

export interface IResponseGamesAll {
  games: IGame[] | null;
  status: number | null;
}

export const getGamesAllApi = async (): Promise<IResponseGamesAll> => {
  const { data, status } = await axios.get<{ data: IGame[] }>(gamesAllApi(), {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseGamesAll = {
    games: data.data,
    status: status,
  };
  return resp;
};
