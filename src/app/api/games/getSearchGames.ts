import axiosApi from '@/shared/lib/axios';
import { IGame } from '@/shared/models/interfaces/game';

interface JsonResponse {
  data: IGame[];
}

export interface IFilter {
  categories: string[];
  providers: string[];
  is_game_avail_for_bonus: boolean;
  query: string;
}

export const sampleIFilter: IFilter = {
  categories: [],
  providers: [],
  is_game_avail_for_bonus: false,
  query: '',
};

export const searchGamesApi = () => {
  return '/api/v1/public/get/games/search';
};

export const getSearchGamesApi = async (filter: IFilter): Promise<IGame[]> => {
  try {
    const res = await axiosApi.post(searchGamesApi(), filter);
    const { data } = res.data as JsonResponse;
    const games = data;
    return games;
  } catch (e) {
    return [];
  }
};
