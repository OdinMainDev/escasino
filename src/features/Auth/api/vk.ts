import axios from 'axios';
import { ISocialsVkProcessRequest, ISocialsVkRequest } from '../models/vk';

export const socialVkApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/socials/vk`;
};

export const doSocialsVk = async (postData: ISocialsVkRequest) => {
  return axios.post<{ url: string; success: boolean }>(socialVkApi(), postData, {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};

export const socialVkProcessApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/socials/vk/process`;
};

export const doSocialsVkProcess = async (postData: ISocialsVkProcessRequest) => {
  return axios.post<{ token: string; success: boolean }>(socialVkProcessApi(), postData, {
    headers: {
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};
