import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IAuthHashRes } from '../entity';
import { IResponseError } from '@/shared/models/interfaces/misc';
import Cookies from 'js-cookie';

export const verifyEmailConfirmApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/verification/email/confirm`;
};

export interface IVerifyEmailConfirmData {
  code: string;
  fid: string;
  hash: string;
}

export const sampleIVerifyEmailConfirmData: IVerifyEmailConfirmData = {
  code: '',
  fid: '',
  hash: '',
};

export const doVerifyEmailConfirmApi = async (
  resetData: IVerifyEmailConfirmData,
): Promise<IAuthHashRes> => {
  try {
    const res: AxiosResponse<IAuthHashRes> = await axios.post(verifyEmailConfirmApi(), resetData, {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 429) {
        // TODO: хендлинг ошибки слишком много попыток
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
