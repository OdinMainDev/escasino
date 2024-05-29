import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ParentPending, ParentFilled, ParentRejected, ISlice } from './slices';
import { ISettings } from '@/shared/models/interfaces/settings';
import { IResponseSettings, getStaticSettingsApi } from '@/app/api/core/getSettings';
import { isAppDebug } from '@/app/config/app';

export interface IInitialStaticSettings extends ISlice {
  staticSettings: ISettings | null;
  status: number;
}

const initialState: IInitialStaticSettings = {
  isFinished: false,
  loading: false,
  hasError: false,
  staticSettings: null,
  status: 0,
};

export const getStaticSettings = createAsyncThunk<
  IResponseSettings,
  void,
  { rejectValue: IResponseSettings }
>('getStaticSettings', async (_settings, { rejectWithValue }) => {
  const data = await getStaticSettingsApi();
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const staticSettingsSlice = createSlice({
  name: 'static-settings',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getStaticSettings.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getStaticSettings.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.staticSettings = action.payload?.settings ?? null;
    });
    builder.addCase(getStaticSettings.rejected, (state, action) => {
      ParentRejected(state);
      state.staticSettings = action?.payload?.settings ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

// export const { logout, setIsAuth, setRole } = settingsSlice.actions;
export default staticSettingsSlice.reducer;
