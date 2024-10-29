import axiosApi from '@/shared/lib/axios';
import { IPlayDemo } from '@/shared/models/interfaces/play';
import { isAxiosError } from 'axios';

export const demoApi = (isPrivate: boolean) => {
  return `/api/v1/${isPrivate ? 'private' : 'public'}/get/game/demo`;
};

export interface IResponseDemo {
  url: string;
  status: number;
}

export const getDemoApi = async (
  id: number,
  isPrivate: boolean,
  isMobile: boolean,
): Promise<IResponseDemo> => {
  try {
    const res = await axiosApi.post(demoApi(isPrivate), { id: id, mobile: isMobile });
    const resp = res.data as IPlayDemo;
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
