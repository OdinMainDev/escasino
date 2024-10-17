import axios from 'axios';
import Cookies from 'js-cookie';
import { IHistoryItem } from '../models/interfaces';

export const paymentTransactionsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/payment/transactions`;
};

export const withdrawTransactionsApi = () => {
  return `${import.meta.env.VITE_APP_BASE_DOMAIN}/api/v1/private/get/my/withdraw/transactions`;
};

export const getPaymentTransactions = async (
  page: number,
  dates: { start: Date; end: Date },
): Promise<IHistoryItem[]> => {
  try {
    const startDate = Math.floor(dates.start.getTime() / 1000);
    const endDate = Math.ceil(dates.end.getTime() / 1000);
    const { data } = await axios.get<{ status: string; data: IHistoryItem[] }>(
      paymentTransactionsApi(),
      {
        headers: {
          Authorization: `Bearer: ${Cookies.get('atoken')}`,
          'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
        },
        params: {
          page: page,
          start_date: startDate,
          end_date: endDate,
        },
      },
    );
    return data.data;
  } catch (e) {
    return [];
  }
};

export const getWithdrawTransactions = async (
  page: number,
  dates: { start: Date; end: Date },
): Promise<IHistoryItem[]> => {
  try {
    const startDate = Math.floor(dates.start.getTime() / 1000);
    const endDate = Math.ceil(dates.end.getTime() / 1000);
    const { data } = await axios.get<{ status: string; data: IHistoryItem[] }>(
      withdrawTransactionsApi(),
      {
        headers: {
          Authorization: `Bearer: ${Cookies.get('atoken')}`,
          'C-Token': import.meta.env.VITE_APP_CASINO_TOKEN ?? '',
        },
        params: {
          page: page || 1,
          start_date: startDate,
          end_date: endDate,
        },
      },
    );
    return data.data;
  } catch (e) {
    return [];
  }
};
