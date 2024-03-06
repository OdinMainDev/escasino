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
    handleHttpError(res.status);
    return false;
  } catch (e) {
    return false;
  }
};

function handleHttpError(status: number) {
  Cookies.remove('token');
  // TODO: 403 статус - страна заблокирована
  // TODO: остальные статусы ( кроме 200ого ) просто кидаем ошибку ( ну пользователя на страницу редиректим с ошибкой )
  // TODO: а так же блокируем всё приложение после
  switch (status) {
    // DEPRECATED - потому что 401 статус - не авторизован ( то есть кривая авторизация )
    // case 401:
    //   console.error('Casino error (401).');
    //   break;
    case 403:
      console.error('Country is blocked (403).');
      break;
    default:
      console.error(`Unexpected status code: ${status}.`);
  }
}
