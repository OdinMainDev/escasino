import axios from 'axios';
import { ILoginData } from '../models/login';

export const loginApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/auth/login`;
};

export const loginHandlerApi = async (loginData: ILoginData): Promise<string | null> => {
  try {
    const res = await axios.post(loginApi(), loginData, {
      headers: {
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
      },
    });
    console.log(res.data);
    return '';
  } catch (e) {
    return null;
  }
};
