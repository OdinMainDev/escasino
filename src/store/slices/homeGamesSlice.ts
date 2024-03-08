import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice } from './slices';
import { IGame } from '@/entities/game';
import { IResponseHomeGames, getHomeGamesApi } from '@/app/api/games/getHomeGames';

export interface IInitialHomeGames extends ISlice {
  games: IGame[] | null;
  status: number;
}

const initialState: IInitialHomeGames = {
  isFinished: false,
  loading: false,
  hasError: false,
  games: null,
  status: 0,
};

export const getHomeGames = createAsyncThunk<
  IResponseHomeGames,
  void,
  { rejectValue: IResponseHomeGames }
>('getHomeGamesApi', async (_homeGames, { rejectWithValue }) => {
  const data = await getHomeGamesApi();
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const homeGamesSlice = createSlice({
  name: 'homeGames',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getHomeGames.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHomeGames.fulfilled, (state, action) => {
      state.loading = false;
      state.isFinished = true;
      state.status = action.payload?.status ?? 200;
      state.games = action.payload?.games ?? null;
    });
    builder.addCase(getHomeGames.rejected, (state, action) => {
      state.loading = false;
      state.hasError = true;
      state.isFinished = true;
      state.games = action?.payload?.games ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

export default homeGamesSlice.reducer;
