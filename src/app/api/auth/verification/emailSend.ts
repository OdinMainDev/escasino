import axios, { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import Cookies from 'js-cookie';
import { handleErrorStatus } from '@/shared/helpers/error';

export const verifyEmailSendApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/verification/email/send`;
};

export interface IVerifyEmailSendData {
  fid: string;
}

export const sampleIVerifyEmailSendData: IVerifyEmailSendData = {
  fid: '',
};

export const doVerifyEmailSendApi = async (
  resetData: IVerifyEmailSendData,
): Promise<IAuthHashRes> => {
  try {
    const res: AxiosResponse<IAuthHashRes> = await axios.post(verifyEmailSendApi(), resetData, {
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
