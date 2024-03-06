import React, { createContext, useContext, useState, useEffect } from 'react';
import { getHomeGamesApi } from '@/app/api/games/getHomeGames';

const defaultState = {
  homeGames: null,
  loading: true,
};

const HomeGamesContext = createContext(defaultState);

export const useHomeGames = () => {
  const context = useContext(HomeGamesContext);
  if (context === undefined) {
    throw new Error('useHomeGames must be used within a HomeGamesProvider');
  }
  return context;
};

export const HomeGamesProvider = ({ children }) => {
  const [homeGames, setHomeGames] = useState(null);
  const [loading, setLoading] = useState(true);

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
