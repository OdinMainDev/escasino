import { ICreatePaymentData, IPaymentData, IPaymentTransaction } from '../models/interfaces';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import axiosApi from '@/shared/lib/axios';

export const createPaymentApi = () => {
  return '/api/v1/private/create/payment';
};

export const paymentTransactionApi = (hash: string) => {
  return `/api/v1/private/get/my/payment/transaction/requisites/${hash}`;
};
export const createPayment = async (data: ICreatePaymentData) => {
  return axiosApi.post<{ hash: string }>(createPaymentApi(), data);
};

export const paymentTransaction = (hash: string) => {
  return axiosApi.get<{ data: IPaymentTransaction; success: boolean; payment_data: IPaymentData }>(
    paymentTransactionApi(hash),
  );
};

export const paymentProvidersApi = (showAll: boolean) => {
  return `/api/v1/private/get/payment/providers?show_all=${showAll ? 'true' : 'false'}`;
};

export interface IResponsePaymentProviders {
  paymentProviders: IPaymentProvider[] | null;
  status: number | null;
}

export const getPaymentProvidersApi = async (
  showAll?: boolean,
): Promise<IResponsePaymentProviders> => {
  try {
    const { data, status } = await axiosApi.get<{ data: IPaymentProvider[] }>(
      paymentProvidersApi(!!showAll),
    );
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
