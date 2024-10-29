import axiosApi from '@/shared/lib/axios';
import { IPlayReal } from '@/shared/models/interfaces/play';
import { isAxiosError } from 'axios';

export const realApi = () => {
  return '/api/v1/private/get/game/real';
};

export interface IResponseReal {
  url: string;
  status: number;
}

export const getRealApi = async (id: number, isMobile: boolean): Promise<IResponseReal> => {
  try {
    const res = await axiosApi.post(realApi(), { id: id, mobile: isMobile });
    const resp = res.data as IPlayReal;
    return {
      url: resp.url,
      status: resp.success ? 200 : 404,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 422) {
        return {
          url: '',
          status: 422,
        };
      }
      if (error.response?.status === 404) {
        return {
          url: '',
          status: 404,
        };
      }
    }

    return {
      url: '',
      status: 666,
    };
  }
};
