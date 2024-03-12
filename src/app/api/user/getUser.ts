import axios from 'axios';
import { IUser } from '@/entities/user';
import Cookies from 'js-cookie';

export const userApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/me`;
};

export interface IResponseUser {
  user: IUser | null;
  status: number | null;
}

export const getUserApi = async (): Promise<IResponseUser> => {
  const { data, status } = await axios.get<{ data: IUser }>(userApi(), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('token')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponseUser = {
    user: data.data,
    status: status,
  };
  return resp;
};
