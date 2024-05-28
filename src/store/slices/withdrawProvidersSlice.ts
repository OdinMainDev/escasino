import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IWithdrawProvider } from '@/shared/models/interfaces/withdrawProviders';
import { isAppDebug } from '@/app/config/app';
import {
  IResponseWithdrawProviders,
  getWithdrawProvidersApi,
} from '@/features/Wallet/api/withdrawApi';

export interface IInitialWithdrawProviders extends ISlice {
  withdrawProviders: IWithdrawProvider[] | null;
  status: number;
}

const initialState: IInitialWithdrawProviders = {
  isFinished: false,
  loading: false,
  hasError: false,
  withdrawProviders: null,
  status: 0,
};

export const getWithdrawProviders = createAsyncThunk<
  IResponseWithdrawProviders,
  void,
  { rejectValue: IResponseWithdrawProviders }
>('getWithdrawProvidersApi', async (_withdrawProviders, { rejectWithValue }) => {
  const data = await getWithdrawProvidersApi(false);
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const withdrawProvidersSlice = createSlice({
  name: 'withdrawProviders',
  initialState: initialState,
  reducers: {
    resetWithdrawProviders: (state: IInitialWithdrawProviders) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWithdrawProviders.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getWithdrawProviders.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.withdrawProviders = action.payload?.withdrawProviders ?? null;
    });
    builder.addCase(getWithdrawProviders.rejected, (state, action) => {
      ParentRejected(state);
      state.status = action?.payload?.status ?? 500;
      state.withdrawProviders = action?.payload?.withdrawProviders ?? null;
    });
  },
});

export const { resetWithdrawProviders } = withdrawProvidersSlice.actions;

export default withdrawProvidersSlice.reducer;
