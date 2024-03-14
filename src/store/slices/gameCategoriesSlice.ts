import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IResponseGameCagerories, getGameCageroriesApi } from '@/app/api/games/getGameCategories';
import { ICategory } from '@/entities/categories';

export interface IInitialGameCagerories extends ISlice {
  categories: ICategory[] | null;
  status: number;
}

const initialState: IInitialGameCagerories = {
  isFinished: false,
  loading: false,
  hasError: false,
  categories: null,
  status: 0,
};

export const getGameCagerories = createAsyncThunk<
  IResponseGameCagerories,
  void,
  { rejectValue: IResponseGameCagerories }
>('getGameCageroriesApi', async (_gameCagerories, { rejectWithValue }) => {
  const data = await getGameCageroriesApi();
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const gameCageroriesSlice = createSlice({
  name: 'gameCagerories',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getGameCagerories.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getGameCagerories.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.categories = action.payload?.categories ?? null;
    });
    builder.addCase(getGameCagerories.rejected, (state, action) => {
      ParentRejected(state);
      state.status = action?.payload?.status ?? 500;
      state.categories = action?.payload?.categories ?? null;
    });
  },
  reducers: {},
});

export default gameCageroriesSlice.reducer;
