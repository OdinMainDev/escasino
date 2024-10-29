import { ICategory } from '@/shared/models/interfaces/categories';
import axiosApi from '@/shared/lib/axios';

export const gameCategoriesApi = () => {
  return '/api/v1/public/get/game-categories';
};

export interface IResponseGameCategories {
  categories: ICategory[] | null;
  status: number | null;
}

export const getGameCategoriesApi = async (): Promise<IResponseGameCategories> => {
  const { data, status } = await axiosApi.get<{ data: ICategory[] }>(gameCategoriesApi());
  const resp: IResponseGameCategories = {
    categories: data.data,
    status: status,
  };
  return resp;
};
