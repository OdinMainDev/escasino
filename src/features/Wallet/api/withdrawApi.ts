import { ICreateWithdrawtData, IPaymentTransaction } from '../models/interfaces';
import { IWithdrawProvider } from '@/shared/models/interfaces/withdrawProviders';
import axiosApi from '@/shared/lib/axios';

export const createWithdrawApi = () => {
  return '/api/v1/private/create/withdraw';
};

export const withdrawTransactionApi = (hash: string) => {
  return `/api/v1/private/get/my/withdraw/transaction/requisites/${hash}`;
};
export const createWithdraw = async (data: ICreateWithdrawtData) => {
  return axiosApi.post<{ hash: string }>(createWithdrawApi(), data);
};

export const withdrawTransaction = (hash: string) => {
  return axiosApi.get<{ data: IPaymentTransaction }>(withdrawTransactionApi(hash));
};

export const withdrawProvidersApi = (showAll: boolean) => {
  return `/api/v1/private/get/withdraw/providers?show_all=${showAll ? 'true' : 'false'}`;
};

export interface IResponseWithdrawProviders {
  withdrawProviders: IWithdrawProvider[] | null;
  status: number | null;
}

export const getWithdrawProvidersApi = async (
  showAll: boolean,
): Promise<IResponseWithdrawProviders> => {
  try {
    const { data, status } = await axiosApi.get<{ data: IWithdrawProvider[] }>(
      withdrawProvidersApi(showAll),
    );
    const resp = {
      withdrawProviders: data.data,
      status: status,
    };
    return resp;
  } catch (e) {
    const resp = {
      withdrawProviders: null,
      status: 500,
    };
    return resp;
  }
};
