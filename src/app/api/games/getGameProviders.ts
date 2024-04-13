import axios from 'axios';
import { IProvider } from '@/shared/models/interfaces/providers';

export const gameProvidersApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/game-providers`;
};

export interface IResponseGameProviders {
  providers: IProvider[] | null;
  status: number | null;
}

export const getGameProvidersApi = async (): Promise<IResponseGameProviders> => {
  const { data, status } = await axios.get<{ data: IProvider[] }>(gameProvidersApi(), {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseGameProviders = {
    providers: data.data,
    status: status,
  };
  return resp;
};
