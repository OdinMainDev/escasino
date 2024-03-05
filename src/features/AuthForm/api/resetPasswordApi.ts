import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IAuthError, IAuthRes } from '../models/auth';
import { IResetPasswordData } from '../models/resetPassword';

export const resetPasswordApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/reset-password`;
};

export const resetPasswordHandlerApi = async (
  resetPasswordData: IResetPasswordData,
): Promise<IAuthRes> => {
  try {
    const res: AxiosResponse<IAuthRes> = await axios.post(resetPasswordApi(), resetPasswordData, {
      headers: {
        'C-Token': import.meta.env.VITE_APP_BASE_DOMAIN ?? '',
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
