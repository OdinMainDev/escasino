import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IWithdrawProvider } from '@/shared/models/interfaces/withdrawProviders';
import { isAppDebug } from '@/app/config/app';
import {
  IResponseWithdrawProviders,
  getWithdrawProvidersApi,
} from '@/features/Wallet/api/withdrawApi';

export interface IInitialWithdrawAllProviders extends ISlice {
  withdrawAllProviders: IWithdrawProvider[] | null;
  status: number;
}

const initialState: IInitialWithdrawAllProviders = {
  isFinished: false,
  loading: false,
  hasError: false,
  withdrawAllProviders: null,
  status: 0,
};

export const getWithdrawAllProviders = createAsyncThunk<
  IResponseWithdrawProviders,
  void,
  { rejectValue: IResponseWithdrawProviders }
>('getWithdrawAllProvidersApi', async (_withdrawAllProviders, { rejectWithValue }) => {
  const data = await getWithdrawProvidersApi(true);
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const withdrawAllProvidersSlice = createSlice({
  name: 'withdrawAllProviders',
  initialState: initialState,
  reducers: {
    resetWithdrawAllProviders: (state: IInitialWithdrawAllProviders) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWithdrawAllProviders.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getWithdrawAllProviders.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.withdrawAllProviders = action.payload?.withdrawProviders ?? null;
    });
    builder.addCase(getWithdrawAllProviders.rejected, (state, action) => {
      ParentRejected(state);
      state.status = action?.payload?.status ?? 500;
      state.withdrawAllProviders = action?.payload?.withdrawProviders ?? null;
    });
  },
});

export const { resetWithdrawAllProviders } = withdrawAllProvidersSlice.actions;

export default withdrawAllProvidersSlice.reducer;
