import axios from 'axios';
import Cookies from 'js-cookie';

export const authApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/private/get/my/auth`;
};

export const checkAuthUserApi = async () => {
  try {
    const res = await axios.get(authApi(), {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
      },
    });
    return res.data as boolean;
  } catch (e) {
    return false;
  }
};
