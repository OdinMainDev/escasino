import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';
import { ISlice } from './slices';
import { ISettings } from '@/entities/settings';
import { IResponseSettings, getSettingsApi } from '@/app/api/core/getSettings';
import { isAppDebug } from '@/app/config/app';

export interface IInitialSettings extends ISlice {
  settings: ISettings | null;
  status: number;
}

const initialState: IInitialSettings = {
  isFinished: false,
  loading: false,
  hasError: false,
  settings: null,
  status: 0,
};

export const getSettings = createAsyncThunk<
  IResponseSettings,
  void,
  { rejectValue: IResponseSettings }
>('getSettingsApi', async (_settings, { rejectWithValue }) => {
  const data = await getSettingsApi();
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getSettings.pending, (state) => {
      if (!state.isFinished) {
        state.loading = true;
      }
      // TODO: попоробовать то что выше обернуть в ф-ю
    });
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.isFinished = true;
      // TODO: попоробовать то что выше обернуть в ф-ю
      state.status = action.payload?.status ?? 200;
      state.settings = action.payload?.settings ?? null;
    });
    builder.addCase(getSettings.rejected, (state, action) => {
      state.loading = false;
      state.hasError = true;
      state.isFinished = true;
      // TODO: попоробовать то что выше обернуть в ф-ю
      state.settings = action?.payload?.settings ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

// export const { logout, setIsAuth, setRole } = settingsSlice.actions;
export default settingsSlice.reducer;
