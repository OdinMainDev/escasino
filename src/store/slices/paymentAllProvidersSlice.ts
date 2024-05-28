import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import { isAppDebug } from '@/app/config/app';
import {
  IResponsePaymentProviders,
  getPaymentProvidersApi,
} from '@/features/Wallet/api/replenishApi';

export interface IInitialPaymentAllProviders extends ISlice {
  paymentAllProviders: IPaymentProvider[] | null;
  status: number;
}

const initialState: IInitialPaymentAllProviders = {
  isFinished: false,
  loading: false,
  hasError: false,
  paymentAllProviders: null,
  status: 0,
};

export const getPaymentAllProviders = createAsyncThunk<
  IResponsePaymentProviders,
  void,
  { rejectValue: IResponsePaymentProviders }
>('getPaymentAllProvidersApi', async (_paymentAllProviders, { rejectWithValue }) => {
  const data = await getPaymentProvidersApi(true);
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const paymentAllProvidersSlice = createSlice({
  name: 'paymentAllProviders',
  initialState: initialState,
  reducers: {
    resetPaymentAllProviders: (state: IInitialPaymentAllProviders) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPaymentAllProviders.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getPaymentAllProviders.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.paymentAllProviders = action.payload?.paymentProviders ?? null;
    });
    builder.addCase(getPaymentAllProviders.rejected, (state, action) => {
      ParentRejected(state);
      state.status = action?.payload?.status ?? 500;
      state.paymentAllProviders = action?.payload?.paymentProviders ?? null;
    });
  },
});

export const { resetPaymentAllProviders } = paymentAllProvidersSlice.actions;

export default paymentAllProvidersSlice.reducer;
