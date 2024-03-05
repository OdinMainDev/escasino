import { IFilter } from '../models/interfaces/filter';
import { IGame } from '../models/interfaces/games';
import axios from 'axios';

interface JsonResponse {
  data: IGame[];
}

export const searchGamesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/games/search`;
};

export const postSearchGamesApi = async (filter: IFilter): Promise<IGame[]> => {
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
