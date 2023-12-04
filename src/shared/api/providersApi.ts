import { IGame } from '../models/interfaces/games';

interface JsonResponse {
  data: IGame[];
}

export const providerGamesApi = (provider_id: string) => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/public/get/games/provider/${provider_id}`;
};

export const getProviderGames = async (provider_id: string): Promise<IGame[]> => {
  try {
    const res = await fetch(providerGamesApi(provider_id), {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
      },
    });

    if (!res.ok) {
      throw new Error('Authn error');
    }

    const { data } = (await res.json()) as JsonResponse;
    const games: IGame[] = data;

    return games;
  } catch (e) {
    return [];
  }
};
