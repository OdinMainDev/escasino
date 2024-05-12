import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IResponseGameProviders, getGameProvidersApi } from '@/app/api/games/getGameProviders';
import { IProvider } from '@/shared/models/interfaces/providers';
import { isAppDebug } from '@/app/config/app';

export interface IInitialGameProviders extends ISlice {
  providers: IProvider[] | null;
  status: number;
}

const initialState: IInitialGameProviders = {
  isFinished: false,
  loading: false,
  hasError: false,
  providers: null,
  status: 0,
};

export const getGameProviders = createAsyncThunk<
  IResponseGameProviders,
  void,
  { rejectValue: IResponseGameProviders }
>('getGameProvidersApi', async (_gameProviders, { rejectWithValue }) => {
  const data = await getGameProvidersApi();
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const gameProvidersSlice = createSlice({
  name: 'gameProviders',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getGameProviders.pending, (state) => {
      ParentPending(state);
      console.log('text');
    });
    builder.addCase(getGameProviders.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.providers = action.payload?.providers ?? null;
    });
    builder.addCase(getGameProviders.rejected, (state, action) => {
      ParentRejected(state);
      state.status = action?.payload?.status ?? 500;
      state.providers = action?.payload?.providers ?? null;
    });
  },
  reducers: {},
});

export default gameProvidersSlice.reducer;
