import { ISettings } from '@/shared/models/interfaces/settings';

export interface IInitialSettings {
  loading: boolean;
  settings: ISettings | null;
  isError: boolean;
}
