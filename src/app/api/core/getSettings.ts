import { isAppDebug } from '@/app/config/app';
import { ISettings } from '@/entities/settings';
import axios from 'axios';

export const settingsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/settings`;
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
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  return resp;
};
