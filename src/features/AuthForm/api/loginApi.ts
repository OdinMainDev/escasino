import axios, { AxiosResponse, isAxiosError } from 'axios';
import { ILoginData } from '../models/login';
import { IAuthRes, IAuthError } from '../models/auth';

export const loginApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/login`;
};

export const loginHandlerApi = async (loginData: ILoginData): Promise<IAuthRes> => {
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
