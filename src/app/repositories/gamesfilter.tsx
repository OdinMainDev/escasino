import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';

interface GamesFilter {
  query: string;
  providers: string[];
  categories: string[];
  isGameAvailForBonus: boolean;
  distinctFilters: boolean;
}

interface GamesFilterContextType {
  filter: GamesFilter;
  setFilter: React.Dispatch<React.SetStateAction<GamesFilter>>;
  clearFilter: () => void;
}

const defaultFilter: GamesFilter = {
  query: '',
  providers: [],
  categories: [],
  isGameAvailForBonus: false,
  distinctFilters: false,
};

const GamesFilterContext = createContext<GamesFilterContextType>({
  filter: defaultFilter,
  setFilter: () => {},
  clearFilter: () => {},
});

export const useGamesFilter = (): GamesFilterContextType => {
  const context = useContext(GamesFilterContext);
  if (context === undefined) {
    throw new Error('useGamesFilter must be used within a GamesFilterProvider');
  }
  return context;
};

interface GamesFilterProviderProps {
  children: ReactNode;
}

export const GamesFilterProvider: FunctionComponent<GamesFilterProviderProps> = ({ children }) => {
  const [filter, setFilter] = useState<GamesFilter>(defaultFilter);

  const clearFilter = () => setFilter(defaultFilter);

  return (
    <GamesFilterContext.Provider value={{ filter, setFilter, clearFilter }}>
      {children}
    </GamesFilterContext.Provider>
  );
};
