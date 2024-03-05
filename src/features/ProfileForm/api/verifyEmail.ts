import axios from 'axios';
import Cookies from 'js-cookie';
import { IVerification, IVerificationRequest } from '../models/verifification';

export const verifificationEmailApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/auth/verification/email/send`;
};

export const verificationEmailHandlerApi = async (req: IVerificationRequest) => {
  try {
    const res = await axios.post(verifificationEmailApi(), req, {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const verify = res.data as IVerification;
    return verify;
  } catch (e) {
    return null;
  }
};
