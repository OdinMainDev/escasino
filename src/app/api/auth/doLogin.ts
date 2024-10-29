import { AxiosResponse } from 'axios';
import { IAuthRes } from './entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const loginApi = () => {
  return '/api/v1/auth/login';
};

export interface ILoginData {
  email: string;
  phone: string;
  password: string;
  fid: string;
  captcha: string;
  remember: boolean;
}

export const sampleILoginData: ILoginData = {
  email: '',
  phone: '',
  password: '',
  fid: '',
  captcha: '',
  remember: false,
};

export const doLoginApi = async (loginData: ILoginData): Promise<IAuthRes> => {
  try {
    const res: AxiosResponse<IAuthRes> = await axiosApi.post(loginApi(), loginData);
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
