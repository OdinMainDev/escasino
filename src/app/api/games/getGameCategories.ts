import axios from 'axios';
import { ICategory } from '@/entities/categories';

export const gameCageroriesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/game-categories`;
};

export interface IResponseGameCagerories {
  categories: ICategory[] | null;
  status: number | null;
}

export const getGameCageroriesApi = async (): Promise<IResponseGameCagerories> => {
  const { data, status } = await axios.get<{ data: ICategory[] }>(gameCageroriesApi(), {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseGameCagerories = {
    categories: data.data,
    status: status,
  };
  return resp;
};
