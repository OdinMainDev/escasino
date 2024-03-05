import axios from 'axios';
import Cookies from 'js-cookie';
import { IUser } from '../models/interfaces/user';

export const userApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/me`;
};

export const getMeUserApi = async () => {
  try {
    const res = await axios.get(userApi(), {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const user = res.data as {
      data: IUser;
    };
    return user.data;
  } catch (e) {
    return null;
  }
};
