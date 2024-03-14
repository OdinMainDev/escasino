import { IBasicErrors, IResponseError } from '@/entities/misc';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import Cookies from 'js-cookie';

export const setUserCurrencyApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/set/my/currency`;
};

export interface IUserCurrency {
  currency: string;
  fid: string | null;
}

export const sampleIUserCurrency: IUserCurrency = {
  currency: '',
  fid: '',
};

export interface IResponseSetUserCurrency {
  errors: IBasicErrors;
  hasErrors: boolean;
  success: boolean;
  email_change_hash: string | null;
  phone_change_hash: string | null;
}

export const doSetUserCurrency = async (form: IUserCurrency): Promise<IResponseSetUserCurrency> => {
  try {
    const res: AxiosResponse<IResponseSetUserCurrency> = await axios.post(
      setUserCurrencyApi(),
      form,
      {
        headers: {
          Authorization: `Bearer: ${Cookies.get('token')}`,
          'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
        },
      },
    );
    const data = res.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 422) {
        const err = error.response?.data as IResponseError;
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
