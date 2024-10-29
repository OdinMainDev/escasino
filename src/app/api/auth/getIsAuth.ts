import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';
import Cookies from 'js-cookie';

export const isAuthApi = () => {
  return '/api/v1/private/get/my/auth';
};

export const getIsAuthApi = async (): Promise<null | boolean> => {
  try {
    if (!Cookies.get('atoken')) {
      return false;
    }
    const res = await axiosApi.get(isAuthApi());
    if (res.status === 200) {
      return true;
    }
    const error = { response: res };
    handleHttpError(res.status);
    throw handleErrorStatus(error);
  } catch (e) {
    return false;
  }
};

function handleHttpError(status: number) {
  Cookies.remove('atoken');
  switch (status) {
    // DEPRECATED - потому что 401 статус - не авторизован ( то есть кривая авторизация )
    // case 401:
    //   console.error('Casino error (401).');
    //   break;
    case 403:
      window.location.href = '/error/unavailable';
      console.error('Country is blocked (403).');
      break;
    default:
      console.error(`Unexpected status code: ${status}.`);
  }
}
