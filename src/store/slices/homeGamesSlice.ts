import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IGame } from '@/entities/game';
import { IResponseHomeGames, getHomeGamesApi } from '@/app/api/games/getHomeGames';
import { isAppDebug } from '@/app/config/app';

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
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
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
      ParentPending(state);
    });
    builder.addCase(getHomeGames.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.games = action.payload?.games ?? null;
    });
    builder.addCase(getHomeGames.rejected, (state, action) => {
      ParentRejected(state);
      state.games = action?.payload?.games ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

export default homeGamesSlice.reducer;
