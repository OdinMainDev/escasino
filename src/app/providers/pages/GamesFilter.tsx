import { useState, ReactNode, createContext, useContext } from 'react';
import { IFilter } from '@/app/api/games/getSearchGames';

interface IProps {
  children: ReactNode;
}

interface IGamesFiltersContext {
  filters: IFilter | null;
  setFilters: (updates: Partial<IFilter>) => void;
  getFilters: () => IFilter;
  countActiveKeys: (obj: IFilter) => number;
  clearFilters: () => void;
}

const GamesFiltersContext = createContext<IGamesFiltersContext>({
  filters: null,
  setFilters: () => {},
  getFilters: () => {
    return simpleIFilter;
  },
  countActiveKeys: () => 0,
  clearFilters: () => {},
});

export const useGamesFilters = () => {
  const context = useContext(GamesFiltersContext);
  if (context === undefined) {
    throw new Error('useGamesFilters must be used within a GamesFiltersProvider');
  }
  return context;
};

export const simpleIFilter = {
  categories: [],
  providers: [],
  is_game_avail_for_bonus: false,
  query: '',
};

const GamesFilterProvider = ({ children }: IProps) => {
  const [filters, setFiltersState] = useState<IFilter>(simpleIFilter);

  const setFilters = (updates: Partial<IFilter>) => {
    setFiltersState((prevFilters: IFilter) => {
      const newFilters = {
        ...prevFilters,
        ...updates,
      };
      return newFilters;
    });
  };

  const countActiveKeys = (newFilters: IFilter): number => {
    const quantity = newFilters.categories.length + 5;
    return quantity;
  };

  const getFilters = () => filters;

  const clearFilters = () => {
    setFiltersState(simpleIFilter);
  };

  return (
    <GamesFiltersContext.Provider
      value={{
        filters,
        setFilters,
        getFilters,
        countActiveKeys,
        clearFilters,
      }}
    >
      {children}
    </GamesFiltersContext.Provider>
  );
};

export default GamesFilterProvider;
