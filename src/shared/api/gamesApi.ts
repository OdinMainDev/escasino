import axios from 'axios';
import { IGame } from '../models/interfaces/games';

interface JsonResponse {
  data: IGame[];
}

interface ITopGames {
  offset?: number;
  limit?: number | 'all';
}

export const gamesApi = (id?: number) => {
  if (id) {
    return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/game/${id}`;
  }
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/games/home`;
};

export const getGamesApi = async (
  options: ITopGames = { offset: 0, limit: 10 },
): Promise<IGame[]> => {
  const { offset = 0, limit = 10 } = options;
  try {
    const res = await fetch(gamesApi(), {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });

    if (!res.ok) {
      throw new Error('Authn error');
    }

    const { data } = (await res.json()) as JsonResponse;
    const games: IGame[] = data;

    if (limit === 'all') {
      return games.slice(offset);
    }

    return games.slice(offset, offset + limit);
  } catch (e) {
    return [];
  }
};

export const getGamesByIdApi = async (id: number): Promise<IGame | null> => {
  try {
    const res = await axios.get<{ data: IGame }>(gamesApi(id), {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    return res.data.data;
  } catch (e) {
    return null;
  }
};
