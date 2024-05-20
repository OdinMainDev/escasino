import axios, { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import Cookies from 'js-cookie';
import { handleErrorStatus } from '@/shared/helpers/error';

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
        Authorization: `Bearer: ${Cookies.get('atoken')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
