import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import { getHomeGamesApi } from '@/app/api/games/getHomeGames';
import { IGame } from '@/app/entities/game';

interface HomeGamesContextType {
  homeGames: IGame[] | null;
  loading: boolean;
}

const HomeGamesContext = createContext<HomeGamesContextType>({ homeGames: null, loading: true });

export const useHomeGames = (): HomeGamesContextType => {
  const context = useContext(HomeGamesContext);
  if (context === undefined) {
    throw new Error('useHomeGames must be used within a HomeGamesProvider');
  }
  return context;
};

interface HomeGamesProviderProps {
  children: ReactNode;
}

export const HomeGamesProvider: FunctionComponent<HomeGamesProviderProps> = ({ children }) => {
  const [homeGames, setHomeGames] = useState<IGame[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadHomeGames = async () => {
      setLoading(true);
      const games = await getHomeGamesApi();
      setHomeGames(games);
      setLoading(false);
    };

    void loadHomeGames();
  }, []);

  return (
    <HomeGamesContext.Provider value={{ homeGames, loading }}>{children}</HomeGamesContext.Provider>
  );
};
