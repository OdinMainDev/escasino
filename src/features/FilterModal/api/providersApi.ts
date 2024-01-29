import { IProvider } from '@/shared/models/interfaces/providers';

interface JsonResponse {
  data: IProvider[];
}

export const providersApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/public/get/game-providers`;
};

export const getProvidersApi = async (): Promise<IProvider[]> => {
  try {
    const res = await fetch(providersApi(), {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
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
