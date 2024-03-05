import axios from 'axios';
import Cookies from 'js-cookie';

export const authApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/auth`;
};

export const checkAuthUserApi = async () => {
  try {
    const res = await axios.get(authApi(), {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    return res.data as boolean;
  } catch (e) {
    return false;
  }
};
