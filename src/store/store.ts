import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import homeGamesReducer from './slices/homeGamesSlice';
import countriesReducer from './slices/countriesSlice';
import { IInitialSettings } from '@/store/slices/settingsSlice';
import { IInitialHomeGames } from '@/store/slices/homeGamesSlice';
import { IInitialCountries } from '@/store/slices/countriesSlice';

interface IReducers {
  settingsReducer: IInitialSettings;
  homeGamesReducer: IInitialHomeGames;
  countriesReducer: IInitialCountries;
}

const reducers: ReducersMapObject<IReducers> = {
  settingsReducer: settingsReducer,
  homeGamesReducer: homeGamesReducer,
  countriesReducer: countriesReducer,
};

const rootReducers = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
