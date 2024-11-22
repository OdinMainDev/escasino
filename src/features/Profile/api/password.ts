import axiosApi from '@/shared/lib/axios';
import { isAxiosError } from 'axios';
import { I2FAPasswordData, IPasswordData } from '../models/password';
import { IResponseError } from '@/shared/models/interfaces/misc';
import { IResponseData } from '@/shared/models/interfaces/axios';

export const changePasswordApi = () => {
  return '/api/v1/auth/change/user/password';
};

export const changePasswordApi2FA = () => {
  return '/api/v1/auth/change/user/2fa-password';
};

export const changePasswordHandler = async (passwordData: IPasswordData) => {
  try {
    const { data } = await axiosApi.post<IResponseData<{ hash?: string; success: boolean }>>(
      changePasswordApi(),
      passwordData,
    );
    return data.data;
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

export const change2FAPasswordHandler = async (passwordData: I2FAPasswordData) => {
  try {
    const { data } = await axiosApi.post<IResponseData<{ success: boolean }>>(
      changePasswordApi2FA(),
      passwordData,
    );
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
