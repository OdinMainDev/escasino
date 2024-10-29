import { IProvider } from '@/shared/models/interfaces/providers';
import axiosApi from '@/shared/lib/axios';

export const gameProvidersApi = () => {
  return '/api/v1/public/get/game-providers';
};

export interface IResponseGameProviders {
  providers: IProvider[] | null;
  status: number | null;
}

export const getGameProvidersApi = async (): Promise<IResponseGameProviders> => {
  const { data, status } = await axiosApi.get<{ data: IProvider[] }>(gameProvidersApi());
  const resp: IResponseGameProviders = {
    providers: data.data,
    status: status,
  };
  return resp;
};
