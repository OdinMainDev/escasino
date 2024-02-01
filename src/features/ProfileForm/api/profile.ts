import axios from 'axios';
import Cookies from 'js-cookie';
import { IUserData } from '../models/user';
import { IUser } from '@/shared/models/interfaces/user';

export const editProfileApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/private/set/my/data`;
};

export const editProfileHandlerApi = async (userData: IUserData) => {
  try {
    const res = await axios.post(editProfileApi(), userData, {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
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
