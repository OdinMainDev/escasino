import axiosApi from '@/shared/lib/axios';
import { IGame } from '@/shared/models/interfaces/game';

export const homeGamesApi = () => {
  return '/api/v1/public/get/games/home';
};

export interface IResponseHomeGames {
  games: IGame[] | null;
  status: number | null;
}

export const getHomeGamesApi = async (): Promise<IResponseHomeGames> => {
  const { data, status } = await axiosApi.get<{ data: IGame[] }>(homeGamesApi());
  const resp: IResponseHomeGames = {
    games: data.data,
    status: status,
  };
  return resp;
};
