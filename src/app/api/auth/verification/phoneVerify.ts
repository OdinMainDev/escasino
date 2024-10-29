import { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const verifyPhoneConfirmApi = () => {
  return '/api/v1/auth/verification/phone/confirm';
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
    const res: AxiosResponse<IAuthHashRes> = await axiosApi.post(
      verifyPhoneConfirmApi(),
      resetData,
    );
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
