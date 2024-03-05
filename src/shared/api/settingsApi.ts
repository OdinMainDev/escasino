import axios from 'axios';
import { ISettings } from '../models/interfaces/settings';

export const settingsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/settings`;
};

export const getSettingsApi = async (): Promise<null | ISettings> => {
  try {
    const res = await axios.get(settingsApi(), {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const { data } = res.data as {
      data: ISettings;
    };
    return data;
  } catch (e) {
    return null;
  }
};
