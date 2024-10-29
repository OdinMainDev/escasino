import { AxiosResponse } from 'axios';
import { IAuthRes } from './entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const resetPasswordApi = () => {
  return '/api/v1/auth/set-password';
};

export interface IResetSetPasswordData {
  hash: string;
  code: string;
  password: string;
  repeat_password: string;
  fid: string;
}

export const sampleIResetSetPasswordData: IResetSetPasswordData = {
  hash: '',
  code: '',
  password: '',
  repeat_password: '',
  fid: '',
};

export const doResetSetPasswordApi = async (
  resetData: IResetSetPasswordData,
): Promise<IAuthRes> => {
  try {
    const res: AxiosResponse<IAuthRes> = await axiosApi.post(resetPasswordApi(), resetData);
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
