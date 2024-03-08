import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import homeGamesReducer from './slices/homeGamesSlice';
import { IInitialSettings } from '@/store/slices/settingsSlice';
import { IInitialHomeGames } from '@/store/slices/homeGamesSlice';
interface IReducers {
  settingsReducer: IInitialSettings;
  homeGamesReducer: IInitialHomeGames;
}

const reducers: ReducersMapObject<IReducers> = {
  settingsReducer: settingsReducer,
  homeGamesReducer: homeGamesReducer,
};

const rootReducers = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
