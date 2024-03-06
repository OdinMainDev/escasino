import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import { getUserApi } from '@/app/api/user/getUser';
import { IUser } from '../entities/user';

interface UserContextType {
  user: IUser | null;
  loading: boolean;
  updateUser: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  updateUser: () => {},
});

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    setLoading(true);
    const fetchedUser = await getUserApi();
    setUser(fetchedUser);
    setLoading(false);
  };

  const updateUser = () => {
    void fetchUser();
  };

  useEffect(() => {
    void fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, updateUser }}>{children}</UserContext.Provider>
  );
};
