import axios from 'axios';
import { ISettings } from '../models/interfaces/settings';

export const settingsApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/public/get/settings`;
};

export const getSettingsApi = async (): Promise<null | ISettings> => {
  try {
    const res = await axios.get(settingsApi(), {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
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
