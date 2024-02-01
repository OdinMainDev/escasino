import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMeUserApi } from '@/shared/api/userApi';
import { IInitialUser } from '../models/user';
import { IUser } from '@/shared/models/interfaces/user';

const initialState: IInitialUser = {
  loading: false,
  isError: false,
  isAuth: false,
  user: null,
};

export const getMeUser = createAsyncThunk('getMeUserApi', async () => {
  const user = await getMeUserApi();
  return user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getMeUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMeUser.fulfilled, (state, action: PayloadAction<IUser | null>) => {
      state.loading = false;
      if (action.payload) {
        state.isAuth = true;
      }
      state.user = action.payload;
    });
    builder.addCase(getMeUser.rejected, (state) => {
      state.isError = true;
    });
  },
  reducers: {},
});

export default userSlice.reducer;
