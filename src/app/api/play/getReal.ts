import { IPlayReal } from '@/shared/models/interfaces/play';
import axios, { isAxiosError } from 'axios';
import Cookies from 'js-cookie';

export const realApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/game/real`;
};

export interface IResponseReal {
  url: string;
  status: number;
}

export const getRealApi = async (id: number, isMobile: boolean): Promise<IResponseReal> => {
  try {
    const res = await axios.post(
      realApi(),
      { id: id, mobile: isMobile },
      {
        headers: {
          'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
          Authorization: `Bearer: ${Cookies.get('token')}`,
        },
      },
    );
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
