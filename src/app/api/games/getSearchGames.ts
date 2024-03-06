import { IGame } from '@/app/entities/game';
import axios from 'axios';

interface JsonResponse {
  data: IGame[];
}

export interface IFilter {
  categories: string[];
  providers: string[];
  is_game_avail_for_bonus: boolean;
  distinct_filters: boolean;
  query: string;
}

export const searchGamesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/games/search`;
};

export const getSearchGamesApi = async (filter: IFilter): Promise<IGame[]> => {
  try {
    const res = await axios.post(searchGamesApi(), filter, {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const { data } = res.data as JsonResponse;
    const games = data;
    return games;
  } catch (e) {
    return [];
  }
};
