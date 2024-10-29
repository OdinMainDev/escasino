import axiosApi from '@/shared/lib/axios';
import { IGame } from '@/shared/models/interfaces/game';

export const gamesAllApi = () => {
  return '/api/v1/public/get/games/all';
};

export interface IResponseGamesAll {
  games: IGame[] | null;
  status: number | null;
}

export const getGamesAllApi = async (): Promise<IResponseGamesAll> => {
  const { data, status } = await axiosApi.get<{ data: IGame[] }>(gamesAllApi());
  const resp: IResponseGamesAll = {
    games: data.data,
    status: status,
  };
  return resp;
};
