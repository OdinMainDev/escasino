import axiosApi from '@/shared/lib/axios';
import { ISettings, IStaticSettings } from '@/shared/models/interfaces/settings';

export const settingsApi = () => {
  return '/api/v1/public/get/settings';
};

export const staticSettingsApi = () => {
  return '/api/v1/public/get/static-settings';
};

export interface IResponseSettings {
  settings: ISettings | null;
  status: number | null;
}

export interface IResponseStaticSettings {
  settings: IStaticSettings | null;
  status: number | null;
}

export const getSettingsApi = async (): Promise<IResponseSettings> => {
  const { data, status } = await axiosApi.get<{ data: ISettings }>(settingsApi());
  const resp: IResponseSettings = {
    settings: data.data,
    status: status,
  };
  return resp;
};

export const getStaticSettingsApi = async (): Promise<IResponseStaticSettings> => {
  const { data, status } = await axiosApi.get<{ data: IStaticSettings }>(staticSettingsApi());
  const resp: IResponseStaticSettings = {
    settings: data.data,
    status: status,
  };
  return resp;
};
