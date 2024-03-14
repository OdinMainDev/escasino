/* eslint-disable react-hooks/exhaustive-deps */
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
  setFiltersQuantity: (quantity: number) => void;
  getFiltersQuantity: () => number;
  clearFilters: () => void;
}

const GamesFiltersContext = createContext<IGamesFiltersContext>({
  filters: null,
  setFilters: () => {},
  getFilters: () => {
    return simpleIFilter;
  },
  countActiveKeys: () => 0,
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

export const simpleIFilter = {
  categories: [],
  providers: [],
  is_game_avail_for_bonus: false,
  query: '',
};

const GamesFilterProvider = ({ children }: IProps) => {
  const [filters, setFiltersState] = useState<IFilter>(simpleIFilter);
  const [filtersQuantity, setFiltersQuantityState] = useState<number>(0);

  // OLD
  // const setFilters = (newFilters: IFilter) => {
  //   setFiltersState(newFilters);
  //   setFiltersQuantityState(
  //     newFilters.categories.length +
  //       newFilters.providers.length +
  //       (newFilters.is_game_avail_for_bonus ? 1 : 0) +
  //       (newFilters.query.length > 0 ? 1 : 0),
  //   );
  // };

  const setFilters = (updates: Partial<IFilter>) => {
    setFiltersState((prevFilters: IFilter) => {
      const newFilters = {
        ...prevFilters,
        ...updates,
      };
      setFiltersQuantityState(countActiveKeys(newFilters));
      return newFilters;
    });
  };

  const countActiveKeys = (newFilters: IFilter): number => {
    const quantity =
      (newFilters.categories ? newFilters.categories.length : 0) +
      (newFilters.providers ? newFilters.providers.length : 0) +
      (newFilters.is_game_avail_for_bonus ? 1 : 0) +
      (newFilters.query && newFilters.query.length > 0 ? 1 : 0);
    return quantity;
  };

  const getFilters = () => filters;

  const setFiltersQuantity = (quantity: number) => {
    setFiltersQuantityState(quantity);
  };

  const getFiltersQuantity = () => filtersQuantity;

  const clearFilters = () => {
    setFiltersState(simpleIFilter);
    setFiltersQuantityState(0);
  };

  return (
    <GamesFiltersContext.Provider
      value={{
        filters,
        setFilters,
        getFilters,
        countActiveKeys,
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
