import axios from 'axios';
import { ICategory } from '@/entities/categories';

export const gameCategoriesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/game-categories`;
};

export interface IResponseGameCategories {
  categories: ICategory[] | null;
  status: number | null;
}

export const getGameCategoriesApi = async (): Promise<IResponseGameCategories> => {
  const { data, status } = await axios.get<{ data: ICategory[] }>(gameCategoriesApi(), {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseGameCategories = {
    categories: data.data,
    status: status,
  };
  return resp;
};
