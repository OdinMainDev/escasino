import { IFilter } from '../models/interfaces/filter';
import { IGame } from '../models/interfaces/games';
import axios from 'axios';

interface JsonResponse {
  data: IGame[];
}

export const searchGamesApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/public/get/games/search`;
};

export const postSearchGamesApi = async (filter: IFilter): Promise<IGame[]> => {
  try {
    const res = await axios.post(searchGamesApi(), filter, {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
      },
    });
    const { data } = res.data as JsonResponse;
    const games = data;
    return games;
  } catch (e) {
    return [];
  }
};
