import axios from 'axios';
import Cookies from 'js-cookie';
import { ICreateWithdrawtData, IPaymentTransaction } from '../models/interfaces';
import { IWithdrawProvider } from '@/shared/models/interfaces/withdrawProviders';

export const createWithdrawApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/create/withdraw`;
};

export const withdrawTransactionApi = (hash: string) => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/withdraw/transaction/requisites/${hash}`;
};
export const createWithdraw = async (data: ICreateWithdrawtData) => {
  return axios.post<{ hash: string }>(createWithdrawApi(), data, {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};

export const withdrawTransaction = (hash: string) => {
  return axios.get<{ data: IPaymentTransaction }>(withdrawTransactionApi(hash), {
    headers: {
      Authorization: `Bearer: ${Cookies.get('atoken')}`,
      'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
    },
  });
};

export const withdrawProvidersApi = (showAll: boolean) => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/withdraw/providers?show_all=${showAll ? 'true' : 'false'}`;
};

export interface IResponseWithdrawProviders {
  withdrawProviders: IWithdrawProvider[] | null;
  status: number | null;
}

export const getWithdrawProvidersApi = async (
  showAll: boolean,
): Promise<IResponseWithdrawProviders> => {
  try {
    const { data, status } = await axios.get<{ data: IWithdrawProvider[] }>(
      withdrawProvidersApi(showAll),
      {
        headers: {
          Authorization: `Bearer: ${Cookies.get('atoken')}`,
          'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
        },
      },
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
