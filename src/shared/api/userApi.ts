import axios from 'axios';
import Cookies from 'js-cookie';
import { IUser } from '../models/interfaces/user';

export const userApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/private/get/me`;
};

export const getMeUserApi = async () => {
  try {
    const res = await axios.get(userApi(), {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
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
