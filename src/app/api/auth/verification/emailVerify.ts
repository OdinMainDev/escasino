import axios, { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import Cookies from 'js-cookie';
import { handleErrorStatus } from '@/shared/helpers/error';

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
