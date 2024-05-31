import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ParentPending, ParentFilled, ParentRejected, ISlice } from './slices';
import { isAppDebug } from '@/app/config/app';
import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import { getBonusTemplatesApi, IResponseBonusesTemplate } from '@/app/api/bonuses/bonusesApi';

export interface IInitialBonusesTemplates extends ISlice {
  bonusesTemplates: IBonusTemplate[] | null;
  status: number;
}

const initialState: IInitialBonusesTemplates = {
  isFinished: false,
  loading: false,
  hasError: false,
  bonusesTemplates: null,
  status: 0,
};

export const getBonusesTemplates = createAsyncThunk<
  IResponseBonusesTemplate,
  void,
  { rejectValue: IResponseBonusesTemplate }
>('getMyBonusesApi', async (_settings, { rejectWithValue }) => {
  const data = await getBonusTemplatesApi();
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const bonusesTemplatesSlice = createSlice({
  name: 'bonusesTemplates',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBonusesTemplates.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getBonusesTemplates.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.bonusesTemplates = action.payload?.bonusesTemplates ?? null;
    });
    builder.addCase(getBonusesTemplates.rejected, (state, action) => {
      ParentRejected(state);
      state.bonusesTemplates = action?.payload?.bonusesTemplates ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

export default bonusesTemplatesSlice.reducer;
