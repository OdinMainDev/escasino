import axios from 'axios';
import Cookies from 'js-cookie';
import { IVerificationHistoryItem } from '../models';

export const verificationsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/verifications/all`;
};

export const getVerifications = async () => {
  try {
    const { data } = await axios.get<{ status: string; data: IVerificationHistoryItem[] }>(
      verificationsApi(),
      {
        headers: {
          Authorization: `Bearer: ${Cookies.get('atoken')}`,
          'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
        },
      },
    );
    return data.data;
  } catch (e) {
    return [];
  }
};
