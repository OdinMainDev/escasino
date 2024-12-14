import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IGame } from '@/shared/models/interfaces/game';
import { IResponseHomeGames, getHomeGamesApi } from '@/app/api/games/getHomeGames';
import { isAppDebug } from '@/app/config/app';

export interface IInitialHomeGames extends ISlice {
  games: IGame[];
  status: number;
  isLastElement: boolean;
}

const initialState: IInitialHomeGames = {
  isFinished: false,
  loading: false,
  hasError: false,
  games: [],
  status: 0,
  isLastElement: false,
};

export const getHomeGames = createAsyncThunk<
  IResponseHomeGames,
  { page?: number } | undefined,
  { rejectValue: IResponseHomeGames }
>('getHomeGamesApi', async (args, { rejectWithValue }) => {
  const page = args?.page ?? 1;

  const data = await getHomeGamesApi(page);

  if (isAppDebug) {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(5000);
  }

  if (data.status !== 200) {
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
      const newGames = action.payload?.games || [];
      if (newGames.length === 0) {
        state.isLastElement = true;
      }
      state.games = [
        ...state.games,
        ...newGames.filter(
          (game) => !state.games.some((existingGame) => existingGame.id === game.id),
        ),
      ];
    });
    builder.addCase(getHomeGames.rejected, (state, action) => {
      ParentRejected(state);
      if (action.payload?.games) {
        state.games = [
          ...state.games,
          ...action.payload.games.filter(
            (game) => !state.games.some((existingGame) => existingGame.id === game.id),
          ),
        ];
      }
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {
    setGames: (state, action) => {
      state.games === action.payload;
    },
  },
});

export const { setGames } = homeGamesSlice.actions;

export default homeGamesSlice.reducer;
