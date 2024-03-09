import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IAuthError, IAuthRes } from './entity';

export interface ILoginData {
  email: string;
  phone: string;
  password: string;
  fid: string;
  captcha: string;
  remember: boolean;
}

export const loginApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/login`;
};

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
