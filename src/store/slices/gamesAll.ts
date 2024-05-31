import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IGame } from '@/shared/models/interfaces/game';
import { IResponseHomeGames } from '@/app/api/games/getHomeGames';
import { isAppDebug } from '@/app/config/app';
import { getGamesAllApi } from '@/app/api/games/getGamesAll';

export interface IInitialGameAll extends ISlice {
  games: IGame[] | null;
  status: number;
}

const initialState: IInitialGameAll = {
  isFinished: false,
  loading: false,
  hasError: false,
  games: null,
  status: 0,
};

export const getGamesAll = createAsyncThunk<
  IResponseHomeGames,
  void,
  { rejectValue: IResponseHomeGames }
>('getGamesAllApi', async (_homeGames, { rejectWithValue }) => {
  const data = await getGamesAllApi();
  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);
  }
  if (data.status != 200) {
    return rejectWithValue(data);
  }
  return data;
});

export const gamesAllSlice = createSlice({
  name: 'allGames',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getGamesAll.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getGamesAll.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.games = action.payload?.games ?? null;
    });
    builder.addCase(getGamesAll.rejected, (state, action) => {
      ParentRejected(state);
      state.games = action?.payload?.games ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

export default gamesAllSlice.reducer;
