import { handleErrorStatus } from '@/shared/helpers/error';
import Cookies from 'js-cookie';
import axios from 'axios';

export const documentApi = (): string => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/verification/documents/send`;
};

export const sendDocument = async (formData: FormData): Promise<void> => {
  try {
    await axios.post(documentApi(), formData, {
      headers: {
        Authorization: `Bearer: ${Cookies.get('atoken')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
