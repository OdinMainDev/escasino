import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IResponseCountries, getCountriesApi } from '@/app/api/core/getCountries';
import { isAppDebug } from '@/app/config/app';

export interface IInitialCountries extends ISlice {
  countries: string[];
  status: number;
}

const initialState: IInitialCountries = {
  isFinished: false,
  loading: false,
  hasError: false,
  countries: [],
  status: 0,
};

export const getCountries = createAsyncThunk<
  IResponseCountries,
  void,
  { rejectValue: IResponseCountries }
>('getCountriesApi', async (_countries, { rejectWithValue }) => {
  const data = await getCountriesApi();
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.countries = action.payload?.countries ?? [];
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      ParentRejected(state);
      state.countries = action.payload?.countries ?? [];
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

// export const { logout, setIsAuth, setRole } = userSlice.actions;
export default countriesSlice.reducer;
