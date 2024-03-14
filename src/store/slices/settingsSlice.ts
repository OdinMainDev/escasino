import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';
import { ParentPending, ParentFilled, ParentRejected, ISlice } from './slices';
import { ISettings } from '@/entities/settings';
import { IResponseSettings, getSettingsApi } from '@/app/api/core/getSettings';

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
      ParentPending(state);
    });
    builder.addCase(getSettings.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.settings = action.payload?.settings ?? null;
    });
    builder.addCase(getSettings.rejected, (state, action) => {
      ParentRejected(state);
      state.settings = action?.payload?.settings ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

// export const { logout, setIsAuth, setRole } = settingsSlice.actions;
export default settingsSlice.reducer;
