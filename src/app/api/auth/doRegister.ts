import { AxiosResponse } from 'axios';
import { IAuthRes } from './entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const registerApi = () => {
  return '/api/v1/auth/register';
};

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

export const sampleIRegisterData: IRegisterData = {
  currency: '',
  password: '',
  repeat_password: '',
  terms: false,
  email: '',
  phone: '',
  username: '',
  first_name: '',
  second_name: '',
  last_name: '',
  city: '',
  country: '',
  dob: 0,
  zip: '',
  address: '',
  gender: '',
  promo: true,
  fid: '',
  captcha: '',
};

export const doRegisterApi = async (registerData: IRegisterData) => {
  try {
    const res: AxiosResponse<IAuthRes> = await axiosApi.post(registerApi(), registerData);
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
