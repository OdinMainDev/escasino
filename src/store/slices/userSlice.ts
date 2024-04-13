import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { isAppDebug } from '@/app/config/app';
import { IUser } from '@/shared/models/interfaces/user';
import { IResponseUser, getUserApi } from '@/app/api/user/getUser';

export interface IInitialUser extends ISlice {
  user: IUser | null;
  status: number;
}

const initialState: IInitialUser = {
  isFinished: false,
  loading: false,
  hasError: false,
  user: null,
  status: 0,
};

export const getUser = createAsyncThunk<IResponseUser, void, { rejectValue: IResponseUser }>(
  'getUserApi',
  async (_user, { rejectWithValue }) => {
    const data = await getUserApi();
    if (isAppDebug) {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      await sleep(5000);
    }
    if (data.status != 200) {
      return rejectWithValue(data);
    }
    return data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      ParentPending(state);
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      ParentFilled(state);
      state.status = action.payload?.status ?? 200;
      state.user = action.payload?.user ?? null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      ParentRejected(state);
      state.user = action.payload?.user ?? null;
      state.status = action?.payload?.status ?? 500;
    });
  },
  reducers: {},
});

// export const { logout, setIsAuth, setRole } = userSlice.actions;
export default userSlice.reducer;
