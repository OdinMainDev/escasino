import { IHistoryItem } from '../models/interfaces';
import axiosApi from '@/shared/lib/axios';

export const paymentTransactionsApi = () => {
  return '/api/v1/private/get/my/payment/transactions';
};

export const withdrawTransactionsApi = () => {
  return '/api/v1/private/get/my/withdraw/transactions';
};

export const getPaymentTransactions = async (
  page: number,
  dates: { start: Date; end: Date },
): Promise<IHistoryItem[]> => {
  try {
    const startDate = Math.floor(dates.start.getTime() / 1000);
    const endDate = Math.ceil(dates.end.getTime() / 1000);
    const { data } = await axiosApi.get<{ status: string; data: IHistoryItem[] }>(
      paymentTransactionsApi(),
      {
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
    const { data } = await axiosApi.get<{ status: string; data: IHistoryItem[] }>(
      withdrawTransactionsApi(),
      {
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
