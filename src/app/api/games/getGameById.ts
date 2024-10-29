import axiosApi from '@/shared/lib/axios';
import { IGame } from '@/shared/models/interfaces/game';
export const gameApi = (id: number) => {
  return `/api/v1/public/get/game/${id}`;
};

export interface IResponseGame {
  game: IGame | null;
  status: number | null;
}

export const getGameApi = async (id: number): Promise<IResponseGame> => {
  const { data, status } = await axiosApi.get<{ data: IGame }>(gameApi(id));
  const resp: IResponseGame = {
    game: data.data,
    status: status,
  };
  return resp;
};
