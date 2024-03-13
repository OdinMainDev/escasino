import axios, { AxiosResponse, isAxiosError } from 'axios';
import { IAuthHashRes } from '../entity';
import { IResponseError } from '@/entities/misc';
import Cookies from 'js-cookie';

export const changePhoneSendApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/change/user/phone`;
};

export interface IChangePhoneSendData {
  hash: string;
  code: string;
  fid: string;
}

export const sampleIChangePhoneSendData: IChangePhoneSendData = {
  hash: '',
  code: '',
  fid: '',
};

export const doChangePhoneSendApi = async (
  resetData: IChangePhoneSendData,
): Promise<IAuthHashRes> => {
  try {
    const res: AxiosResponse<IAuthHashRes> = await axios.post(changePhoneSendApi(), resetData, {
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
