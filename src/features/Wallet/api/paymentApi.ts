import axios from 'axios';
import Cookies from 'js-cookie';
import { ICreatePaymentData, IPaymentTransaction } from '../models/interfaces';

export const createPaymentApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/create/payment`;
};

export const paymentTransactionApi = (hash: string) => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/payment/transaction/requisites/${hash}`;
};
export const createPayment = async (data: ICreatePaymentData) => {
  return axios.post<{ hash: string }>(createPaymentApi(), data, {
    headers: {
      Authorization: `Bearer: ${Cookies.get('token')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};

export const paymentTransaction = (hash: string) => {
  return axios.get<{ data: IPaymentTransaction }>(paymentTransactionApi(hash), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('token')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};
