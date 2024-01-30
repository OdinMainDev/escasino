import { combineReducers, configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { IReducers } from './models/interfaces';
import { authModalSlice } from './slices/authModalSlice';
import settingsReducer from './slices/settingsSlice';

const reducers: ReducersMapObject<IReducers> = {
  authModalReducer: authModalSlice.reducer,
  settingsReducer: settingsReducer,
};

const rootReducers = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
