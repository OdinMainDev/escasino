import axios from 'axios';
import Cookies from 'js-cookie';
import { IHistoryItem } from '../models/interfaces';

export const paymentTransactionsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/payment/transactions`;
};

export const withdrawTransactionsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/withdraw/transactions`;
};

export const getPaymentTransactions = async (page?: number): Promise<IHistoryItem[]> => {
  try {
    const { data } = await axios.get<{ status: string; data: IHistoryItem[] }>(
      paymentTransactionsApi(),
      {
        headers: {
          Authorization: `Bearer: ${Cookies.get('atoken')}`,
          'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
        },
        params: {
          page: page || 1,
        },
      },
    );
    return data.data;
  } catch (e) {
    return [];
  }
};

export const getWithdrawTransactions = async (page?: number) => {
  try {
    const { data } = await axios.get<{ status: string; data: IHistoryItem[] }>(
      withdrawTransactionsApi(),
      {
        headers: {
          Authorization: `Bearer: ${Cookies.get('atoken')}`,
          'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
        },
        params: {
          page: page || 1,
        },
      },
    );
    return data.data;
  } catch (e) {
    return [];
  }
};
