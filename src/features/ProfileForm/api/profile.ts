import axios from 'axios';
import Cookies from 'js-cookie';
import { IUserData } from '../models/user';
import { IUser } from '@/shared/models/interfaces/user';

export const editProfileApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/set/my/data`;
};

export const editProfileHandlerApi = async (userData: IUserData) => {
  try {
    const res = await axios.post(editProfileApi(), userData, {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const user = res.data as {
      data: IUser;
    };

    console.log(user);
    return null;
  } catch (e) {
    return null;
  }
};
