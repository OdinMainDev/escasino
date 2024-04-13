import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IAuthHashRes } from '../entity';
import { IResponseError } from '@/shared/models/interfaces/misc';
import Cookies from 'js-cookie';

export const verifyPhoneSendApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/verification/phone/send`;
};

export interface IVerifyPhoneSendData {
  fid: string;
}

export const sampleIVerifyPhoneSendData: IVerifyPhoneSendData = {
  fid: '',
};

export const doVerifyPhoneSendApi = async (
  resetData: IVerifyPhoneSendData,
): Promise<IAuthHashRes> => {
  try {
    const res: AxiosResponse<IAuthHashRes> = await axios.post(verifyPhoneSendApi(), resetData, {
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
