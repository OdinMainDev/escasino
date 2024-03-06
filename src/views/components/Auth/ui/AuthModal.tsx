// import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
// import AuthLoginModal from './AuthLoginModal';
// import AuthRegistrationModal from './AuthRegistrationModal';
// import {
//   closeLoginModal,
//   closeRegistrationModal,
//   closeResetPasswordModal,
//   openLoginModal,
//   openRegistrationModal,
// } from '@/store/slices/authModalSlice';
// import { useEffect } from 'react';
// import { getSettings } from '@/store/slices/settingsSlice';
// import AuthResetPasswordModal from './AuthResetPasswordModal';

const AuthModal = () => {
  return '';
  // const dispatch = useAppDispatch();
  // const { isOpenLogin, isOpenRegistration, isOpenResetPassword } = useAppSelector(
  //   (state) => state.authModalReducer,
  // );

  // useEffect(() => {
  //   void dispatch(getSettings());
  // }, [dispatch]);

  // const openLogin = () => {
  //   document.body.classList.add('overflow-hidden');
  //   dispatch(openLoginModal());
  // };

  // const openRegistration = () => {
  //   document.body.classList.add('overflow-hidden');
  //   dispatch(openRegistrationModal());
  // };

  // const closeLogin = () => {
  //   document.body.classList.remove('overflow-hidden');
  //   dispatch(closeLoginModal());
  // };

  // const closeRegistration = () => {
  //   document.body.classList.remove('overflow-hidden');
  //   dispatch(closeRegistrationModal());
  // };

  // const closeResetPassword = () => {
  //   document.body.classList.remove('overflow-hidden');
  //   dispatch(closeResetPasswordModal());
  // };

  // return (
  //   <>
  //     <AuthLoginModal
  //       isOpen={isOpenLogin}
  //       close={closeLogin}
  //       openRegistrationModal={openRegistration}
  //     />
  //     <AuthRegistrationModal
  //       isOpen={isOpenRegistration}
  //       close={closeRegistration}
  //       openLoginModal={openLogin}
  //     />
  //     <AuthResetPasswordModal isOpen={isOpenResetPassword} close={closeResetPassword} />
  //   </>
  // );
};

export default AuthModal;
