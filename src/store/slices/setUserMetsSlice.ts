import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISlice, ParentFilled, ParentPending, ParentRejected } from './slices';
import { IResponseSetUserMeta, doSetUserMeta, IUserMeta } from '@/app/api/user/setUserMets';

export interface IInitialUserMeta extends ISlice {
  userMeta: IUserMeta | null;
  success: boolean;
}

const initialState: IInitialUserMeta = {
  isFinished: false,
  loading: false,
  hasError: false,
  userMeta: null,
  success: false,
};

export const setUserMeta = createAsyncThunk<
  IResponseSetUserMeta,
  IUserMeta,
  { rejectValue: IResponseSetUserMeta }
>('setUserMetaApi', async (form, { rejectWithValue }) => {
  try {
    const data = await doSetUserMeta(form);
    return data;
  } catch (error) {
    return rejectWithValue(error as IResponseSetUserMeta);
  }
});

export const userMetaSlice = createSlice({
  name: 'userMeta',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setUserMeta.pending, (state) => {
      ParentPending(state);
      state.loading = true;
      state.success = false;
    });
    builder.addCase(setUserMeta.fulfilled, (state, action) => {
      ParentFilled(state);
      state.success = action.payload.success;
      state.userMeta = action.payload.success ? action.meta.arg : null;
      state.loading = false;
    });
    builder.addCase(setUserMeta.rejected, (state) => {
      ParentRejected(state);
      state.loading = false;
      state.success = false;
    });
  },
  reducers: {
    resetUserMeta: (state: IInitialUserMeta) => {
      Object.assign(state, initialState);
    },
  },
});

export const { resetUserMeta } = userMetaSlice.actions;
export default userMetaSlice.reducer;
