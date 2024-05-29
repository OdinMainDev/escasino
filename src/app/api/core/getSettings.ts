import { ISettings } from '@/shared/models/interfaces/settings';
import axios from 'axios';

export const settingsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/settings`;
};

export const staticSettingsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/static-settings`;
};

export interface IResponseSettings {
  settings: ISettings | null;
  status: number | null;
}

export const getSettingsApi = async (): Promise<IResponseSettings> => {
  const { data, status } = await axios.get<{ data: ISettings }>(settingsApi(), {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseSettings = {
    settings: data.data,
    status: status,
  };
  return resp;
};

export const getStaticSettingsApi = async (): Promise<IResponseSettings> => {
  const { data, status } = await axios.get<{ data: ISettings }>(staticSettingsApi(), {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseSettings = {
    settings: data.data,
    status: status,
  };
  return resp;
};
