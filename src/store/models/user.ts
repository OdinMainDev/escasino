import { IUser } from '@/shared/models/interfaces/user';

export interface IInitialUser {
  loading: boolean;
  isError: boolean;
  isAuth: boolean;
  user: IUser | null;
}
