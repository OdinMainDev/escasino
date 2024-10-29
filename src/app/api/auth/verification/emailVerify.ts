import { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const verifyEmailConfirmApi = () => {
  return '/api/v1/auth/verification/email/confirm';
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
    const res: AxiosResponse<IAuthHashRes> = await axiosApi.post(
      verifyEmailConfirmApi(),
      resetData,
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
