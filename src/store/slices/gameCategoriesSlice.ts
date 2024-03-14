import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IResponseGameCategories, getGameCategoriesApi } from '@/app/api/games/getGameCategories';
import { ICategory } from '@/entities/categories';

export interface IInitialGameCategories extends ISlice {
  categories: ICategory[] | null;
  status: number;
}

const initialState: IInitialGameCategories = {
  isFinished: false,
  loading: false,
  hasError: false,
  categories: null,
  status: 0,
};

export const getGameCategories = createAsyncThunk<
  IResponseGameCategories,
  void,
  { rejectValue: IResponseGameCategories }
>('getGameCategoriesApi', async (_gameCategories, { rejectWithValue }) => {
  const data = await getGameCategoriesApi();
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const gameCategoriesSlice = createSlice({
  name: 'gameCategories',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getGameCategories.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getGameCategories.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.categories = action.payload?.categories ?? null;
    });
    builder.addCase(getGameCategories.rejected, (state, action) => {
      ParentRejected(state);
      state.status = action?.payload?.status ?? 500;
      state.categories = action?.payload?.categories ?? null;
    });
  },
  reducers: {},
});

export default gameCategoriesSlice.reducer;
