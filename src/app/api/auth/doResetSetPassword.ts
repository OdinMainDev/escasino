import axios, { AxiosResponse } from 'axios';
import { IAuthRes } from './entity';
import { handleErrorStatus } from '@/shared/helpers/error';

export const resetPasswordApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/set-password`;
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
    const res: AxiosResponse<IAuthRes> = await axios.post(resetPasswordApi(), resetData, {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const data = res.data;
    return data;
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
