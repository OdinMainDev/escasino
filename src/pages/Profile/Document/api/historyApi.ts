import { IVerificationHistoryItem } from '../models';
import axiosApi from '@/shared/lib/axios';

export const verificationsApi = () => {
  return '/api/v1/private/get/my/verifications/all';
};

export const getVerifications = async () => {
  try {
    const { data } = await axiosApi.get<{ status: string; data: IVerificationHistoryItem[] }>(
      verificationsApi(),
    );
    return data.data;
  } catch (e) {
    return [];
  }
};
