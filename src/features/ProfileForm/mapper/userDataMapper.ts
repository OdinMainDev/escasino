import { IUser } from '@/shared/models/interfaces/user';
import { IUserData } from '../models/user';

export const userDataMapper = (user: IUser): IUserData => {
  return {
    first_name: user.data.first_name,
    last_name: user.data.last_name,
    second_name: user.data.second_name,
    email: user.email,
    phone: user.phone,
    address: user.data.address,
  };
};
