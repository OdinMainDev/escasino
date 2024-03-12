import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IAuthError, IAuthHashRes } from './entity';

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
    if (isAxiosError(error)) {
      if (error.response?.status === 422) {
        const err = error.response?.data as IAuthError;
        throw err;
      }
      if (error.response?.status === 429) {
        // TODO: хендлинг ошибки слишком много попыток
        const err = error.response?.data as IAuthError;
        throw err;
      }
      throw {
        errors: 'Unknown error',
        success: false,
      };
    } else {
      throw {
        errors: 'Unknown error',
        success: false,
      };
    }
  }
};
