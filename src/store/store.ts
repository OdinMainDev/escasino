import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import homeGamesReducer from './slices/homeGamesSlice';
import countriesReducer from './slices/countriesSlice';
import userReducer from './slices/userSlice';
import gameCategoriesReducer from './slices/gameCategoriesSlice';
import gameProvidersReducer from './slices/gameProvidersSlice';
import billingGroupsReducer from './slices/billingGroupsSlice';
import paymentProvidersReducer from './slices/paymentProvidersSlice';
import paymentAllProvidersSlice from './slices/paymentAllProvidersSlice';
import { IInitialSettings } from '@/store/slices/settingsSlice';
import { IInitialHomeGames } from '@/store/slices/homeGamesSlice';
import { IInitialCountries } from '@/store/slices/countriesSlice';
import { IInitialUser } from './slices/userSlice';
import { IInitialGameCategories } from './slices/gameCategoriesSlice';
import { IInitialGameProviders } from './slices/gameProvidersSlice';
import { IInitialBillingGroups } from './slices/billingGroupsSlice';
import { IInitialPaymentProviders } from './slices/paymentProvidersSlice';
import { IInitialPaymentAllProviders } from './slices/paymentAllProvidersSlice';

interface IReducers {
  settingsReducer: IInitialSettings;
  homeGamesReducer: IInitialHomeGames;
  countriesReducer: IInitialCountries;
  userReducer: IInitialUser;
  gameCategoriesReducer: IInitialGameCategories;
  gameProvidersReducer: IInitialGameProviders;
  billingGroupsReducer: IInitialBillingGroups;
  paymentProvidersReducer: IInitialPaymentProviders;
  paymentAllProvidersReducer: IInitialPaymentAllProviders;
}

const reducers: ReducersMapObject<IReducers> = {
  settingsReducer: settingsReducer,
  homeGamesReducer: homeGamesReducer,
  countriesReducer: countriesReducer,
  userReducer: userReducer,
  gameCategoriesReducer: gameCategoriesReducer,
  gameProvidersReducer: gameProvidersReducer,
  billingGroupsReducer: billingGroupsReducer,
  paymentProvidersReducer: paymentProvidersReducer,
  paymentAllProvidersReducer: paymentAllProvidersSlice,
};

const rootReducers = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
