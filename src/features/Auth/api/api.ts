import { ISocialsApiRequest } from '../models/api';
import axiosApi from '@/shared/lib/axios';

export const apiProcessApi = () => {
  return '/api/v1/auth/api';
};

export const doApiProcess = async (postData: ISocialsApiRequest) => {
  return axiosApi.post<{ token: string; success: boolean }>(apiProcessApi(), postData);
};
