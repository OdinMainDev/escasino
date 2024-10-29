import { AxiosResponse } from 'axios';
import { IAuthHashRes } from '../entity';
import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const changePhoneSendApi = () => {
  return '/api/v1/auth/change/user/phone';
};

export interface IChangePhoneSendData {
  hash: string;
  code: string;
  fid: string;
}

export const sampleIChangePhoneSendData: IChangePhoneSendData = {
  hash: '',
  code: '',
  fid: '',
};

export const doChangePhoneSendApi = async (
  resetData: IChangePhoneSendData,
): Promise<IAuthHashRes> => {
  try {
    const res: AxiosResponse<IAuthHashRes> = await axiosApi.post(changePhoneSendApi(), resetData);
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
