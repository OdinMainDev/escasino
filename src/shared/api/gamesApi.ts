import { IGame } from '../models/interfaces/games';

interface JsonResponse {
  data: IGame[];
}

interface ITopGames {
  offset?: number;
  limit?: number | 'all';
}

export const gamesApi = () => {
  return `${process.env.BASE_URL}/api/v1/public/get/games/home`;
};

export const getTopGamesApi = async (
  options: ITopGames = { offset: 0, limit: 10 },
): Promise<IGame[]> => {
  const { offset, limit } = options;
  try {
    const res = await fetch(gamesApi(), {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || '',
      },
    });

    if (!res.ok) {
      throw new Error('Authn error');
    }

    const { data } = (await res.json()) as JsonResponse;
    const games: IGame[] = data;

    if (limit === 'all') {
      return games;
    }

    return games.slice(offset, offset + limit);
  } catch (e) {
    return [];
  }
};
