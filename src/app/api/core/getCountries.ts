import axios from 'axios';

export const countriesApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/public/get/countries`;
};

export const getCountriesApi = async (): Promise<null | string[]> => {
  try {
    const res = await axios.get(countriesApi(), {
      headers: {
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    if (res.status === 200) {
      const { data } = res.data as {
        data: string[];
      };
      return data;
    }
    handleHttpError(res.status);
    return null;
  } catch (e) {
    return null;
  }
};

function handleHttpError(status: number) {
  // TODO: сделать проверку на ошибки, если статус возвращается 200 - все ок, если статус 401 ( ошибка казино )
  // TODO: 403 статус - страна заблокирована
  // TODO: остальные статусы ( кроме 200ого ) просто кидаем ошибку ( ну пользователя на страницу редиректим с ошибкой )
  // TODO: а так же блокируем всё приложение после
  switch (status) {
    case 401:
      console.error('Casino error (401).');
      break;
    case 403:
      console.error('Country is blocked (403).');
      break;
    default:
      console.error(`Unexpected status code: ${status}.`);
  }
}
