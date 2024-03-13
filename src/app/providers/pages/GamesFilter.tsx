/* eslint-disable react-hooks/exhaustive-deps */
import { useState, ReactNode, createContext, useContext } from 'react';
import { IFilter } from '@/app/api/games/getSearchGames';

interface IProps {
  children: ReactNode;
}

interface IGamesFiltersContext {
  filters: IFilter | null;
  setFilters: (filters: IFilter[]) => void;
  getFilters: () => IFilter[];
  setFiltersQuantity: (quantity: number) => void;
  getFiltersQuantity: () => number;
  clearFilters: () => void;
}

const GamesFiltersContext = createContext<IGamesFiltersContext>({
  filters: null,
  setFilters: () => {},
  getFilters: () => {
    return [];
  },
  setFiltersQuantity: () => {},
  getFiltersQuantity: () => {
    return 0;
  },
  clearFilters: () => {},
});

export const useGamesFilters = () => {
  const context = useContext(GamesFiltersContext);
  if (context === undefined) {
    throw new Error('useGamesFilters must be used within a GamesFiltersProvider');
  }
  return context;
};

const GamesFilterProvider = ({ children }: IProps) => {
  const [filters, setFiltersState] = useState<IFilter>(null);
  const [filtersQuantity, setFiltersQuantityState] = useState<number>(0);

  const setFilters = (newFilters: IFilter) => {
    setFiltersState(newFilters);
    setFiltersQuantityState(newFilters.length);
  };

  const getFilters = () => filters;

  const setFiltersQuantity = (quantity: number) => {
    setFiltersQuantityState(quantity);
  };

  const getFiltersQuantity = () => filtersQuantity;

  const clearFilters = () => {
    setFiltersState([]);
    setFiltersQuantityState(0);
  };

  return (
    <GamesFiltersContext.Provider
      value={{
        filters,
        setFilters,
        getFilters,
        setFiltersQuantity,
        getFiltersQuantity,
        clearFilters,
      }}
    >
      {children}
    </GamesFiltersContext.Provider>
  );
};

export default GamesFilterProvider;
