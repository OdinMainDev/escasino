import { handleErrorStatus } from '@/shared/helpers/error';
import axiosApi from '@/shared/lib/axios';

export const documentApi = (): string => {
  return '/api/v1/auth/verification/documents/send';
};

export const sendDocument = async (formData: FormData): Promise<void> => {
  try {
    await axiosApi.post(documentApi(), formData);
  } catch (error) {
    throw handleErrorStatus(error);
  }
};
