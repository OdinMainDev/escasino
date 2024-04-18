import axios, { AxiosResponse } from 'axios';
import { IAuthRes } from './entity';
import { handleErrorStatus } from '@/shared/helpers/error';

export const loginApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/login`;
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
    const res: AxiosResponse<IAuthRes> = await axios.post(loginApi(), loginData, {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
