import axiosApi from '@/shared/lib/axios';
import { IBasicErrors, IResponseError } from '@/shared/models/interfaces/misc';
import { AxiosResponse, isAxiosError } from 'axios';

export const setUserMetaApi = () => {
  return '/api/v1/private/set/my/currency';
};

export interface IUserMeta {
  language: string | null;
  fid: string | null;
}

export const sampleIUserMeta: IUserMeta = {
  language: '',
  fid: '',
};

export interface IResponseSetUserMeta {
  errors: IBasicErrors;
  hasErrors: boolean;
  success: boolean;
  email_change_hash: string | null;
  phone_change_hash: string | null;
}

export const doSetUserMeta = async (form: IUserMeta): Promise<IResponseSetUserMeta> => {
  try {
    const res: AxiosResponse<IResponseSetUserMeta> = await axiosApi.post(setUserMetaApi(), form);
    const data = res.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 422) {
        const err = error.response?.data as IResponseError;
        throw err;
      }
      throw {
        errors: 'Unknown error',
        success: false,
      };
    } else {
      throw {
        errors: 'Unknown error',
        success: false,
      };
    }
  }
};
