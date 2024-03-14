import { IPlayDemo } from '@/entities/play';
import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';

export const demoApi = (isPrivate: boolean) => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/${isPrivate ? 'private' : 'public'}/get/game/demo`;
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
    const res = await axios.post(
      demoApi(isPrivate),
      { id: id, mobile: isMobile },
      {
        headers: {
          'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
          Authorization: `Bearer: ${Cookies.get('token')}`,
        },
      },
    );
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
