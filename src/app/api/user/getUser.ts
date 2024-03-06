import { IUser } from '@/app/entities/user';
import axios from 'axios';
import Cookies from 'js-cookie';

export const userApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/me`;
};

export const getUserApi = async () => {
  try {
    const res = await axios.get(userApi(), {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    if (res.status === 200) {
      const user = res.data as {
        data: IUser;
      };
      return user.data;
    }
    handleHttpError(res.status);
    return null;
  } catch (e) {
    return null;
  }
};

function handleHttpError(status: number) {
  Cookies.remove('token');
  // TODO: сделать проверку на ошибки, если статус возвращается 200 - все ок
  // TODO: 403 статус - страна заблокирована
  // TODO: остальные статусы ( кроме 200ого ) просто кидаем ошибку ( ну пользователя на страницу редиректим с ошибкой )
  // TODO: а так же блокируем всё приложение после
  switch (status) {
    case 403:
      console.error('Country is blocked (403).');
      break;
    default:
      console.error(`Unexpected status code: ${status}.`);
  }
}
