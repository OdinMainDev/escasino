import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IGame } from '@/shared/models/interfaces/game';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IResponseData } from '@/shared/models/interfaces/axios';
import { getBonusGames } from '@/pages/Bonus/api/bonusGamesApi';

export interface IBonusGamesProvider extends ISlice {
  allGames: IGame[];
  bonusId: number | null;  
}

const initialState: IBonusGamesProvider = {
  allGames: [],
  bonusId: null,  
  isFinished: false,
  loading: false,
  hasError: false,
};

export const fetchBonusGames = createAsyncThunk<
  IResponseData<IGame[]>,
  { bonusId?: number; isNoDeposit?: boolean }
>('bonusGamesApi', async ({ bonusId, isNoDeposit }, { rejectWithValue }) => {
  try {
    const response = await getBonusGames(bonusId, isNoDeposit);
    return response;
  } catch (error) {
    return rejectWithValue(error as IResponseData<IGame[]>);
  }
});

const bonusGamesSlice = createSlice({
  name: 'bonusGames',
  initialState,
  reducers: {
    resetBonusGames: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBonusGames.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(fetchBonusGames.fulfilled, (state, action) => {
      ParentFilled(state);
      state.loading = false;
      state.bonusId = action.meta.arg.bonusId || null; 

      state.isFinished = true;

      if (action.payload.data.length !== 0) {
        state.allGames = [...action.payload.data];
      }

    });
    builder.addCase(fetchBonusGames.rejected, (state) => {
      ParentRejected(state);
      state.loading = false;
      state.hasError = true;
    });
  },
});

export const { resetBonusGames } = bonusGamesSlice.actions;
export default bonusGamesSlice.reducer;
