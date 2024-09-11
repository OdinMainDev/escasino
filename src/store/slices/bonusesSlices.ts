import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ParentPending, ParentFilled, ParentRejected, ISlice } from './slices';
import { isAppDebug } from '@/app/config/app';
import { IBonus } from '@/shared/models/interfaces/bonuses';
import { getMyBonusesApi, IResponseBonuses } from '@/app/api/bonuses/bonusesApi';

export interface IInitialBonuses extends ISlice {
  bonuses: IBonus[] | null;
  activeBonuses: IBonus[];
  status: number;
}

const initialState: IInitialBonuses = {
  isFinished: false,
  loading: false,
  hasError: false,
  bonuses: null,
  activeBonuses: [],
  status: 0,
};

export const getBonuses = createAsyncThunk<
  IResponseBonuses,
  { completed?: boolean } | undefined,
  { rejectValue: IResponseBonuses }
>('getMyBonusesApi', async (_settings, { rejectWithValue }) => {
  const data = await getMyBonusesApi(!!_settings?.completed);
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
      state.loading = true;
    });
    builder.addCase(getBonuses.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.bonuses = action.payload?.bonuses ?? null;
      if (state.bonuses) {
        state.activeBonuses = state.bonuses.filter((item) => item.status === 2) ?? null;
      }
      state.loading = false;
    });
    builder.addCase(getBonuses.rejected, (state, action) => {
      ParentRejected(state);
      state.loading = false;
      state.bonuses = action?.payload?.bonuses ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {
    resetBonuses: (state: IInitialBonuses) => {
      Object.assign(state, initialState);
    },
  },
});

export const { resetBonuses } = bonusesSlice.actions;

export default bonusesSlice.reducer;
