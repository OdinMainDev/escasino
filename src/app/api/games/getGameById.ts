import { IGame } from '@/shared/models/interfaces/game';
import axios from 'axios';

export const gameApi = (id: number) => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/game/${id}`;
};

export interface IResponseGame {
  game: IGame | null;
  status: number | null;
}

export const getGameApi = async (id: number): Promise<IResponseGame> => {
  const { data, status } = await axios.get<{ data: IGame }>(gameApi(id), {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseGame = {
    game: data.data,
    status: status,
  };
  return resp;
};
