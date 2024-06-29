import axios from 'axios';
import { ISocialsApiRequest } from '../models/api';

export const apiProcessApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/api`;
};

export const doApiProcess = async (postData: ISocialsApiRequest) => {
  return axios.post<{ token: string; success: boolean }>(apiProcessApi(), postData, {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};
