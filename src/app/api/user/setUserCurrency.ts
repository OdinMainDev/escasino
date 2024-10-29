import axiosApi from '@/shared/lib/axios';
import { IBasicErrors, IResponseError } from '@/shared/models/interfaces/misc';
import { AxiosResponse, isAxiosError } from 'axios';

export const setUserCurrencyApi = () => {
  return '/api/v1/private/set/my/currency';
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
    const res: AxiosResponse<IResponseSetUserCurrency> = await axiosApi.post(
      setUserCurrencyApi(),
      form,
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
