import axios, { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import Cookies from 'js-cookie';
import { handleErrorStatus } from '@/shared/helpers/error';

export const verifyPhoneConfirmApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/verification/phone/confirm`;
};

export interface IVerifyPhoneConfirmData {
  code: string;
  fid: string;
  hash: string;
}

export const sampleIVerifyPhoneConfirmData: IVerifyPhoneConfirmData = {
  code: '',
  fid: '',
  hash: '',
};

export const doVerifyPhoneConfirmApi = async (
  resetData: IVerifyPhoneConfirmData,
): Promise<IAuthHashRes> => {
  try {
    const res: AxiosResponse<IAuthHashRes> = await axios.post(verifyPhoneConfirmApi(), resetData, {
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
