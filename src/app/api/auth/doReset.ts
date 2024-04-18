import axios, { AxiosResponse } from 'axios';
import { IAuthHashRes } from './entity';
import { handleErrorStatus } from '@/shared/helpers/error';

export const resetPasswordApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/reset-password`;
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
    const res: AxiosResponse<IAuthHashRes> = await axios.post(resetPasswordApi(), resetData, {
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
