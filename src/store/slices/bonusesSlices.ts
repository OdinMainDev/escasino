import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ParentPending, ParentFilled, ParentRejected, ISlice } from './slices';
import { isAppDebug } from '@/app/config/app';
import { IBonus } from '@/shared/models/interfaces/bonuses';
import { getMyBonusesApi, IResponseBonuses } from '@/app/api/bonuses/bonusesApi';

export interface IInitialBonuses extends ISlice {
  bonuses: IBonus[] | null;
  status: number;
}

const initialState: IInitialBonuses = {
  isFinished: false,
  loading: false,
  hasError: false,
  bonuses: null,
  status: 0,
};

export const getBonuses = createAsyncThunk<
  IResponseBonuses,
  void,
  { rejectValue: IResponseBonuses }
>('getMyBonusesApi', async (_settings, { rejectWithValue }) => {
  const data = await getMyBonusesApi();
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const bonusesSlice = createSlice({
  name: 'bonuses',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBonuses.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getBonuses.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.bonuses = action.payload?.bonuses ?? null;
    });
    builder.addCase(getBonuses.rejected, (state, action) => {
      ParentRejected(state);
      state.bonuses = action?.payload?.bonuses ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

export default bonusesSlice.reducer;
