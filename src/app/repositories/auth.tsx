import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import { getIsAuthApi } from '@/app/api/auth/getIsAuth';

// Define the context shape
interface IsAuthContextType {
  isAuth: boolean;
  loading: boolean;
}

const IsAuthContext = createContext<IsAuthContextType>({ isAuth: false, loading: true });

export const useIsAuth = (): IsAuthContextType => {
  const context = useContext(IsAuthContext);
  if (context === undefined) {
    throw new Error('useIsAuth must be used within a IsAuthProvider');
  }
  return context;
};

interface IsAuthProviderProps {
  children: ReactNode;
}

export const IsAuthProvider: FunctionComponent<IsAuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadIsAuth = async () => {
      setLoading(true);
      const isAuthenticated = await getIsAuthApi();
      setIsAuth(isAuthenticated === true);
      setLoading(false);
    };

    void loadIsAuth();
  }, []);

  return <IsAuthContext.Provider value={{ isAuth, loading }}>{children}</IsAuthContext.Provider>;
};
