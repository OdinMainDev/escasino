import { IBasicErrors, IResponseError } from '@/shared/models/interfaces/misc';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import Cookies from 'js-cookie';

export const setUserDataApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/set/my/data`;
};

export interface IUserData {
  email: string;
  phone: string;
  username: string;
  first_name: string;
  second_name: string;
  last_name: string;
  gender: string;
  dob: number | string;
  country: string;
  city: string;
  address: string;
  zip: string;
  promo: boolean;
  fid: string | null;
}

export const sampleIUserData: IUserData = {
  email: '',
  phone: '',
  username: '',
  first_name: '',
  second_name: '',
  last_name: '',
  gender: '',
  dob: new Date().getTime(),
  country: '',
  city: '',
  address: '',
  zip: '',
  promo: true,
  fid: '',
};

export interface IResponseSetUserData {
  errors: IBasicErrors;
  hasErrors: boolean;
  success: boolean;
  email_change_hash: string | null;
  phone_change_hash: string | null;
}

export const doSetUserData = async (form: IUserData): Promise<IResponseSetUserData> => {
  try {
    const res: AxiosResponse<IResponseSetUserData> = await axios.post(setUserDataApi(), form, {
      headers: {
        Authorization: `Bearer: ${Cookies.get('atoken')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
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
