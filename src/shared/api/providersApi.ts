import { IGame } from '../models/interfaces/games';

interface JsonResponse {
  data: IGame[];
}

export const providerGamesApi = (provider_id: string) => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/games/provider/${provider_id}`;
};

export const getProviderGames = async (provider_id: string): Promise<IGame[]> => {
  try {
    const res = await fetch(providerGamesApi(provider_id), {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
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
