import axios, { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import Cookies from 'js-cookie';
import { handleErrorStatus } from '@/shared/helpers/error';

export const changeEmailSendApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/change/user/email`;
};

export interface IChangeEmailSendData {
  hash: string;
  code: string;
  fid: string;
}

export const sampleIChangeEmailSendData: IChangeEmailSendData = {
  hash: '',
  code: '',
  fid: '',
};

export const doChangeEmailSendApi = async (
  resetData: IChangeEmailSendData,
): Promise<IAuthHashRes> => {
  try {
    const res: AxiosResponse<IAuthHashRes> = await axios.post(changeEmailSendApi(), resetData, {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
