import axios from 'axios';
import Cookies from 'js-cookie';
import { ICreatePaymentData, IPaymentTransaction } from '../models/interfaces';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';

export const createPaymentApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/create/payment`;
};

export const paymentTransactionApi = (hash: string) => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/payment/transaction/requisites/${hash}`;
};
export const createPayment = async (data: ICreatePaymentData) => {
  return axios.post<{ hash: string }>(createPaymentApi(), data, {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};

export const paymentTransaction = (hash: string) => {
  return axios.get<{ data: IPaymentTransaction }>(paymentTransactionApi(hash), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};

export const paymentProvidersApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/payment/providers`;
};

export interface IResponsePaymentProviders {
  paymentProviders: IPaymentProvider[] | null;
  status: number | null;
}

export const getPaymentProvidersApi = async (): Promise<IResponsePaymentProviders> => {
  try {
    const { data, status } = await axios.get<{ data: IPaymentProvider[] }>(paymentProvidersApi(), {
      headers: {
        Authorization: `Bearer: ${Cookies.get('atoken')}`,
        'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
      },
    });
    const resp = {
      paymentProviders: data.data,
      status: status,
    };
    return resp;
  } catch (e) {
    const resp = {
      paymentProviders: null,
      status: 500,
    };
    return resp;
  }
};
