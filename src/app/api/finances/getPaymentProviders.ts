import axios from 'axios';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import Cookies from 'js-cookie';

export const paymentProvidersApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/payment/providers`;
};

export interface IResponsePaymentProviders {
  paymentProviders: IPaymentProvider[] | null;
  status: number | null;
}

export const getPaymentProvidersApi = async (): Promise<IResponsePaymentProviders> => {
  const { data, status } = await axios.get<{ data: IPaymentProvider[] }>(paymentProvidersApi(), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('token')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
  const resp: IResponsePaymentProviders = {
    paymentProviders: data.data,
    status: status,
  };
  return resp;
};
