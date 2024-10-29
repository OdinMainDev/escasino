import axiosApi from '@/shared/lib/axios';
import { ISocialsVkProcessRequest, ISocialsVkRequest } from '../models/vk';

export const socialVkApi = () => {
  return '/api/v1/auth/socials/vk';
};

export const doSocialsVk = async (postData: ISocialsVkRequest) => {
  return axiosApi.post<{ url: string; success: boolean }>(socialVkApi(), postData);
};

export const socialVkProcessApi = () => {
  return '/api/v1/auth/socials/vk/process';
};

export const doSocialsVkProcess = async (postData: ISocialsVkProcessRequest) => {
  return axiosApi.post<{ token: string; success: boolean }>(socialVkProcessApi(), postData);
};
