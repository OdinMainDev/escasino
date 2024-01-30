import { IAuthModalScheme } from '@/widgets/Auth';
import { IInitialSettings } from './settings';

export interface IReducers {
  authModalReducer: IAuthModalScheme;
  settingsReducer: IInitialSettings;
}
