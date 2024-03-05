import { ICategory } from '@/shared/models/interfaces/categories';

interface JsonResponse {
  data: ICategory[];
}

export const categoriesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/game-categories`;
};

export const getCategoriesApi = async (): Promise<ICategory[]> => {
  try {
    const res = await fetch(categoriesApi(), {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
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
