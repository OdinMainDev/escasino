import { IUser } from '@/shared/models/interfaces/user';
import axiosApi from '@/shared/lib/axios';

export const userApi = () => {
  return '/api/v1/private/get/me';
};

export interface IResponseUser {
  user: IUser | null;
  status: number | null;
}

export const getUserApi = async (): Promise<IResponseUser> => {
  const { data, status } = await axiosApi.get<{ data: IUser }>(userApi());
  const resp: IResponseUser = {
    user: data.data,
    status: status,
  };
  return resp;
};
