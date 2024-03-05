import React, { PropsWithChildren } from 'react';
import AuthProvider from '../providers/AuthProvider';

const MainLayout = ({ children }: PropsWithChildren) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default MainLayout;
