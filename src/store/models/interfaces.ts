import { IAuthModalScheme } from '@/widgets/Auth';
import { IInitialSettings } from './settings';
import { IInitialUser } from './user';

export interface IReducers {
  authModalReducer: IAuthModalScheme;
  settingsReducer: IInitialSettings;
  userReducer: IInitialUser;
}
