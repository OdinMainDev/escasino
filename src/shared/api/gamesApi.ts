import { IGame } from '../models/interfaces/games';

interface JsonResponse {
  data: IGame[];
}

interface ITopGames {
  offset?: number;
  limit?: number | 'all';
}

export const gamesApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/public/get/games/home`;
};

export const getGamesApi = async (
  options: ITopGames = { offset: 0, limit: 10 },
): Promise<IGame[]> => {
  const { offset = 0, limit = 10 } = options;
  try {
    const res = await fetch(gamesApi(), {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
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

export const getGamesById = async (id: number): Promise<IGame | null> => {
  try {
    const res = await fetch(gamesApi(), {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
      },
    });

    if (!res.ok) {
      throw new Error('Authn error');
    }

    const { data } = (await res.json()) as JsonResponse;
    const games: IGame[] = data;
    return games.find((item) => item.id === id) ?? null;
  } catch (e) {
    return null;
  }
};
