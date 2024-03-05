import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IAuthRes, IAuthError } from '../models/auth';
import { IRegisterData } from '../models/register';

export const registerApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/register`;
};

export const registerHandlerApi = async (registerData: IRegisterData) => {
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
