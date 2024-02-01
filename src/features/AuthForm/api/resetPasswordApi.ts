import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IAuthError, IAuthRes } from '../models/auth';
import { IResetPasswordData } from '../models/resetPassword';

export const resetPasswordApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/auth/reset-password`;
};

export const resetPasswordHandlerApi = async (
  resetPasswordData: IResetPasswordData,
): Promise<IAuthRes> => {
  try {
    const res: AxiosResponse<IAuthRes> = await axios.post(resetPasswordApi(), resetPasswordData, {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
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
