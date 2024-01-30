import axios, { AxiosResponse, isAxiosError } from 'axios';
import { ILoginData, ILoginError, ILoginRes } from '../models/login';

export const loginApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/auth/login`;
};

export const loginHandlerApi = async (loginData: ILoginData): Promise<ILoginRes> => {
  try {
    const res: AxiosResponse<ILoginRes> = await axios.post(loginApi(), loginData, {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 422) {
        const err = error.response?.data as ILoginError;
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
