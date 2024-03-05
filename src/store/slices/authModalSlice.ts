import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthModalScheme } from '../../widgets/Auth/models/interface';

const initialState: IAuthModalScheme = {
  isOpenLogin: false,
  isOpenResetPassword: false,
  isOpenRegistration: false,
};

export const authModalSlice = createSlice({
  name: 'authModalSlice',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isOpenLogin = true;
      state.isOpenRegistration = false;
      state.isOpenResetPassword = false;
    },
    openRegistrationModal: (state) => {
      state.isOpenLogin = false;
      state.isOpenRegistration = true;
      state.isOpenResetPassword = false;
    },
    openResetPasswordModal: (state) => {
      state.isOpenResetPassword = true;
      state.isOpenLogin = false;
      state.isOpenRegistration = false;
    },
    closeRegistrationModal: (state) => {
      state.isOpenRegistration = false;
    },
    closeLoginModal: (state) => {
      state.isOpenLogin = false;
    },
    closeResetPasswordModal: (state) => {
      state.isOpenResetPassword = false;
    },
    setIsOpenLogin: (state, action: PayloadAction<boolean>) => {
      state.isOpenLogin = action.payload;
    },
    setIsOpenRegistration: (state, action: PayloadAction<boolean>) => {
      state.isOpenRegistration = action.payload;
    },
  },
});

export const {
  setIsOpenLogin,
  setIsOpenRegistration,
  openLoginModal,
  openRegistrationModal,
  closeRegistrationModal,
  closeLoginModal,
  closeResetPasswordModal,
  openResetPasswordModal,
} = authModalSlice.actions;
export const { reducer: authModalSliceReducer } = authModalSlice;
