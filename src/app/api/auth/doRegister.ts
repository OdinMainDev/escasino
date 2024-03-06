import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IAuthError, IAuthRes } from './entity';

export interface IRegisterData {
  currency: string;
  password: string;
  repeat_password: string;
  terms: boolean;
  email: string;
  phone: string;
  username: string;
  first_name: string;
  second_name: string;
  last_name: string;
  city: string;
  country: string;
  dob: number;
  zip: string;
  address: string;
  gender: string;
  promo: boolean;
  fid: string;
  captcha: string;
}

export const registerApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/register`;
};

export const doRegisterApi = async (registerData: IRegisterData) => {
  try {
    const res: AxiosResponse<IAuthRes> = await axios.post(registerApi(), registerData, {
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
