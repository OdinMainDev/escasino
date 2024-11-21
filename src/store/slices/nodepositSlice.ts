import { INoDepositBonus } from '@/shared/models/interfaces/bonuses';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IResponseData } from '@/shared/models/interfaces/axios';
import { isAppDebug } from '@/app/config/app';
import { getMyNoDepositBonuses } from '@/app/api/bonuses/noDepositBonusesApi';

export interface IInitialNoDeposit extends ISlice {
  noDepositsBonuses: INoDepositBonus[];
  status: number;
}

const initialState: IInitialNoDeposit = {
  isFinished: false,
  loading: false,
  hasError: false,
  status: 0,
  noDepositsBonuses: [],
};

export const getNodepositBonuses = createAsyncThunk<
  IResponseData<INoDepositBonus[]>,
  void,
  { rejectValue: IResponseData<INoDepositBonus[]> }
>('getMyNoDepositBonusesApi', async (_, { rejectWithValue }) => {
  const data = await getMyNoDepositBonuses();
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const noDepositBonusesSlice = createSlice({
  name: 'noDepositBonuses',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getNodepositBonuses.pending, (state) => {
      ParentPending(state);
      state.loading = true;
    });
    builder.addCase(getNodepositBonuses.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.noDepositsBonuses = action.payload?.data ?? [];
      state.loading = false;
    });
    builder.addCase(getNodepositBonuses.rejected, (state, action) => {
      ParentRejected(state);
      state.loading = false;
      state.noDepositsBonuses = action.payload?.data ?? [];
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

export default noDepositBonusesSlice.reducer;
