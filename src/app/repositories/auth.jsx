import React, { createContext, useContext, useState, useEffect } from 'react';
import { getIsAuthApi } from '@/app/api/auth/getIsAuth';

const defaultState = {
  isAuth: false,
  loading: true,
};

const IsAuthContext = createContext(defaultState);

export const useIsAuth = () => {
  const context = useContext(IsAuthContext);
  if (context === undefined) {
    throw new Error('useIsAuth must be used within a IsAuthProvider');
  }
  return context;
};

export const IsAuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIsAuth = async () => {
      setLoading(true);
      const isAuth = await getIsAuthApi();
      setIsAuth(isAuth);
      setLoading(false);
    };

    void loadIsAuth();
  }, []);

  return <IsAuthContext.Provider value={{ isAuth, loading }}>{children}</IsAuthContext.Provider>;
};
