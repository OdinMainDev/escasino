import { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const verifyPhoneSendApi = () => {
  return '/api/v1/auth/verification/phone/send';
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
    const res: AxiosResponse<IAuthHashRes> = await axiosApi.post(verifyPhoneSendApi(), resetData);
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
