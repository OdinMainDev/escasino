// import React, { ReactNode, useEffect } from 'react';
import { useAuthProvider } from '../AuthProvider';
import { useRouter } from '@/shared/helpers/navigation';
import { Outlet } from 'react-router-dom';

// TODO исправить прелоадер, чтобы не было ошибок с ним
const AuthGuardProvider = () => {
  const { isAuth } = useAuthProvider();
  const router = useRouter();
  if (!isAuth) {
    router.push('/');
    return;
  }
  return <Outlet />;
};

export default AuthGuardProvider;
