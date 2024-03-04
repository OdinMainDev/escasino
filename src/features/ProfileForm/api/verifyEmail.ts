import axios from 'axios';
import Cookies from 'js-cookie';
import { IVerification, IVerificationRequest } from '../models/verifification';

export const verifificationEmailApi = () => {
  let domain;
  if (process.env.BASE_URL) {
    domain = `${process.env.BASE_URL}`;
  }
  if (process.env.NEXT_PUBLIC_BASE_DOMAIN) {
    domain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN}`;
  }
  return `${domain}/api/v1/auth/verification/email/send`;
};

export const verificationEmailHandlerApi = async (req: IVerificationRequest) => {
  try {
    const res = await axios.post(verifificationEmailApi(), req, {
      headers: {
        Authorization: `Bearer: ${Cookies.get('token')}`,
        'C-Token': process.env.CASINO_TOKEN || process.env.NEXT_PUBLIC_CASINO_TOKEN || '',
      },
    });
    const verify = res.data as IVerification;
    return verify;
  } catch (e) {
    return null;
  }
};
