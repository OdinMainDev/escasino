import { getSettingsApi } from '@/shared/api/settingsApi';
import { ISettings } from '@/shared/models/interfaces/settings';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IInitialSettings } from '../models/settings';

const initialState: IInitialSettings = {
  loading: false,
  settings: null,
  isError: false,
};

export const getSettings = createAsyncThunk('getSettings', async () => {
  const data = await getSettingsApi();
  return data;
});

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getSettings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSettings.fulfilled, (state, action: PayloadAction<ISettings | null>) => {
      state.loading = false;
      state.settings = action.payload;
    });
    builder.addCase(getSettings.rejected, (state) => {
      state.isError = true;
    });
  },
  reducers: {},
});

export default settingsSlice.reducer;
