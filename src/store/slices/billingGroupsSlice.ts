import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IResponseBillingGroups, getBillingGroupsApi } from '@/app/api/finances/getBillingGroups';
import { IBillingGroup } from '@/shared/models/interfaces/billingGroups';
import { isAppDebug } from '@/app/config/app';

export interface IInitialBillingGroups extends ISlice {
  billingGroups: IBillingGroup[] | null;
  status: number;
}

const initialState: IInitialBillingGroups = {
  isFinished: false,
  loading: false,
  hasError: false,
  billingGroups: null,
  status: 0,
};

export const getBillingGroups = createAsyncThunk<
  IResponseBillingGroups,
  void,
  { rejectValue: IResponseBillingGroups }
>('getBillingGroupsApi', async (_billingGroups, { rejectWithValue }) => {
  const data = await getBillingGroupsApi();
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const billingGroupsSlice = createSlice({
  name: 'billingGroups',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBillingGroups.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getBillingGroups.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.billingGroups = action.payload?.billingGroups ?? null;
    });
    builder.addCase(getBillingGroups.rejected, (state, action) => {
      ParentRejected(state);
      state.status = action?.payload?.status ?? 500;
      state.billingGroups = action?.payload?.billingGroups ?? null;
    });
  },
  reducers: {},
});

export default billingGroupsSlice.reducer;
