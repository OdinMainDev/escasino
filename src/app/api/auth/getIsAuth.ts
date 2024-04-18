import { handleErrorStatus } from '@/shared/helpers/error';
import axios from 'axios';
import Cookies from 'js-cookie';

export const isAuthApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/auth`;
};

export const getIsAuthApi = async (): Promise<null | boolean> => {
  try {
    if (!Cookies.get('token')) {
      return false;
    }
    const res = await axios.get(isAuthApi(), {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
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
  Cookies.remove('token');
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
