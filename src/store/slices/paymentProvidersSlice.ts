import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import { isAppDebug } from '@/app/config/app';
import {
  IResponsePaymentProviders,
  getPaymentProvidersApi,
} from '@/features/Wallet/api/replenishApi';

export interface IInitialPaymentProviders extends ISlice {
  paymentProviders: IPaymentProvider[] | null;
  status: number;
}

const initialState: IInitialPaymentProviders = {
  isFinished: false,
  loading: false,
  hasError: false,
  paymentProviders: null,
  status: 0,
};

export const getPaymentProviders = createAsyncThunk<
  IResponsePaymentProviders,
  void,
  { rejectValue: IResponsePaymentProviders }
>('getPaymentProvidersApi', async (_paymentProviders, { rejectWithValue }) => {
  const data = await getPaymentProvidersApi(false);
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const paymentProvidersSlice = createSlice({
  name: 'paymentProviders',
  initialState: initialState,
  reducers: {
    resetPaymentProviders: (state: IInitialPaymentProviders) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPaymentProviders.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getPaymentProviders.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.paymentProviders = action.payload?.paymentProviders ?? null;
    });
    builder.addCase(getPaymentProviders.rejected, (state, action) => {
      ParentRejected(state);
      state.status = action?.payload?.status ?? 500;
      state.paymentProviders = action?.payload?.paymentProviders ?? null;
    });
  },
});

export const { resetPaymentProviders } = paymentProvidersSlice.actions;

export default paymentProvidersSlice.reducer;
