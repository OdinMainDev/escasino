import { IUser } from '@/shared/models/interfaces/user';
import { IUserData } from '../models/user';

export const userDataMapper = (user: IUser): IUserData => {
  const dob = user.data.dob;
  const dateTime = new Date(dob * 1000).toISOString().slice(0, 16);
  return {
    email: user.email,
    phone: user.phone,
    username: user.username,
    first_name: user.data.first_name,
    second_name: user.data.second_name,
    last_name: user.data.last_name,
    gender: user.data.gender,
    dob: dateTime,
    country: user.data.country,
    city: user.data.city,
    address: user.data.address,
    zip: user.data.zip,
  };
};
