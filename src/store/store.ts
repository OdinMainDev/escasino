import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import homeGamesReducer from './slices/homeGamesSlice';
import countriesReducer from './slices/countriesSlice';
import userReducer from './slices/userSlice';
import { IInitialSettings } from '@/store/slices/settingsSlice';
import { IInitialHomeGames } from '@/store/slices/homeGamesSlice';
import { IInitialCountries } from '@/store/slices/countriesSlice';
import { IInitialUser } from './slices/userSlice';

interface IReducers {
  settingsReducer: IInitialSettings;
  homeGamesReducer: IInitialHomeGames;
  countriesReducer: IInitialCountries;
  userReducer: IInitialUser;
}

const reducers: ReducersMapObject<IReducers> = {
  settingsReducer: settingsReducer,
  homeGamesReducer: homeGamesReducer,
  countriesReducer: countriesReducer,
  userReducer: userReducer,
};

const rootReducers = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
