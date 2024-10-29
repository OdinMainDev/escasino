import { AxiosResponse } from 'axios';
import { IAuthHashRes } from './entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const resetPasswordApi = () => {
  return '/api/v1/auth/reset-password';
};

export interface IResetData {
  email: string;
  phone: string;
  fid: string;
  captcha: string;
  remember: boolean;
}

export const sampleIResetData: IResetData = {
  email: '',
  phone: '',
  fid: '',
  captcha: '',
  remember: false,
};

export const doResetApi = async (resetData: IResetData): Promise<IAuthHashRes> => {
  try {
    const res: AxiosResponse<IAuthHashRes> = await axiosApi.post(resetPasswordApi(), resetData);
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
