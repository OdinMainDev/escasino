import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import { getIsAuthApi } from '../api/auth/getIsAuth';
import Cookies from 'js-cookie';

interface AuthProviderContextType {
  isAuth: boolean;
  loading: boolean;
  setAuthenticated: (jwt: string) => void;
  unsetAuthenticated: () => void;
}

const AuthProviderContext = createContext<AuthProviderContextType>({
  isAuth: false,
  loading: true,
  setAuthenticated: () => {},
  unsetAuthenticated: () => {},
});

export const useAuthProvider = (): AuthProviderContextType => {
  const context = useContext(AuthProviderContext);
  if (context === undefined) {
    throw new Error('useAuthProvider must be used within a AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAuthProvider = async () => {
      setLoading(true);
      const isAuthApi = await getIsAuthApi();
      setIsAuth(isAuthApi === true);
      setLoading(false);
    };

    void loadAuthProvider();
  }, []);

  const setAuthenticated = (jwt: string) => {
    Cookies.set('token', jwt);
    setIsAuth(true);
  };
  const unsetAuthenticated = () => {
    Cookies.remove('token');
    setIsAuth(false);
  };

  return (
    <AuthProviderContext.Provider value={{ isAuth, loading, setAuthenticated, unsetAuthenticated }}>
      {children}
    </AuthProviderContext.Provider>
  );
};
