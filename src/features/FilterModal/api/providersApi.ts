import { IProvider } from '@/shared/models/interfaces/providers';

interface JsonResponse {
  data: IProvider[];
}

export const providersApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/game-providers`;
};

export const getProvidersApi = async (): Promise<IProvider[]> => {
  try {
    const res = await fetch(providersApi(), {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    if (!res.ok) {
      throw new Error('Authn error');
    }
    const { data } = (await res.json()) as JsonResponse;
    const providers: IProvider[] = data;
    return providers;
  } catch (e) {
    return [];
  }
};
