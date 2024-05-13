import axios from 'axios';
import Cookies from 'js-cookie';
import { ICreatePaymentData } from '../models/interfaces';

export const createPaymentApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/create/payment`;
};

export const createPayment = async (data: ICreatePaymentData) => {
  return axios.post(createPaymentApi(), data, {
    headers: {
      Authorization: `Bearer: ${Cookies.get('token')}`,
    },
  });
};
