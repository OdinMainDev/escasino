import { ICategory } from '@/shared/models/interfaces/categories';

interface JsonResponse {
  data: ICategory[];
}

export const categoriesApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/public/get/game-categories`;
};

export const getCategoriesApi = async (): Promise<ICategory[]> => {
  try {
    const res = await fetch(categoriesApi(), {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
      },
    });
    if (!res.ok) {
      throw new Error('Authn error');
    }
    const { data } = (await res.json()) as JsonResponse;
    const categories: ICategory[] = data;
    return categories;
  } catch (e) {
    return [];
  }
};
