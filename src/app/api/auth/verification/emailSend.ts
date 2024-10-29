import { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const verifyEmailSendApi = () => {
  return '/api/v1/auth/verification/email/send';
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
    const res: AxiosResponse<IAuthHashRes> = await axiosApi.post(verifyEmailSendApi(), resetData);
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
