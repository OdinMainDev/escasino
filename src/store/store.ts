import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import staticSettingsReducer, { IInitialStaticSettings } from './slices/staticSettingsSlice';
import homeGamesReducer from './slices/homeGamesSlice';
import countriesReducer from './slices/countriesSlice';
import userReducer from './slices/userSlice';
import gameCategoriesReducer from './slices/gameCategoriesSlice';
import gameProvidersReducer from './slices/gameProvidersSlice';
import billingGroupsReducer from './slices/billingGroupsSlice';
import paymentProvidersReducer from './slices/paymentProvidersSlice';
import paymentAllProvidersSlice from './slices/paymentAllProvidersSlice';
import withdrawProvidersReducer from './slices/withdrawProvidersSlice';
import withdrawAllProvidersSlice from './slices/withdrawAllProvidersSlice';
import { IInitialSettings } from '@/store/slices/settingsSlice';
import { IInitialHomeGames } from '@/store/slices/homeGamesSlice';
import { IInitialCountries } from '@/store/slices/countriesSlice';
import { IInitialUser } from './slices/userSlice';
import { IInitialGameCategories } from './slices/gameCategoriesSlice';
import { IInitialGameProviders } from './slices/gameProvidersSlice';
import { IInitialBillingGroups } from './slices/billingGroupsSlice';
import { IInitialPaymentProviders } from './slices/paymentProvidersSlice';
import { IInitialPaymentAllProviders } from './slices/paymentAllProvidersSlice';
import { IInitialWithdrawProviders } from './slices/withdrawProvidersSlice';
import { IInitialWithdrawAllProviders } from './slices/withdrawAllProvidersSlice';

interface IReducers {
  settingsReducer: IInitialSettings;
  staticSettingsReducer: IInitialStaticSettings;
  homeGamesReducer: IInitialHomeGames;
  countriesReducer: IInitialCountries;
  userReducer: IInitialUser;
  gameCategoriesReducer: IInitialGameCategories;
  gameProvidersReducer: IInitialGameProviders;
  billingGroupsReducer: IInitialBillingGroups;
  paymentProvidersReducer: IInitialPaymentProviders;
  paymentAllProvidersSlice: IInitialPaymentAllProviders;
  withdrawProvidersReducer: IInitialWithdrawProviders;
  withdrawAllProvidersSlice: IInitialWithdrawAllProviders;
}

const reducers: ReducersMapObject<IReducers> = {
  settingsReducer: settingsReducer,
  staticSettingsReducer: staticSettingsReducer,
  homeGamesReducer: homeGamesReducer,
  countriesReducer: countriesReducer,
  userReducer: userReducer,
  gameCategoriesReducer: gameCategoriesReducer,
  gameProvidersReducer: gameProvidersReducer,
  billingGroupsReducer: billingGroupsReducer,
  paymentProvidersReducer: paymentProvidersReducer,
  paymentAllProvidersSlice: paymentAllProvidersSlice,
  withdrawProvidersReducer: withdrawProvidersReducer,
  withdrawAllProvidersSlice: withdrawAllProvidersSlice,
};

const rootReducers = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
