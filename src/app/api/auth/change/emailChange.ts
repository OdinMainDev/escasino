import { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const changeEmailSendApi = () => {
  return '/api/v1/auth/change/user/email';
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
    const res: AxiosResponse<IAuthHashRes> = await axiosApi.post(changeEmailSendApi(), resetData);
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
