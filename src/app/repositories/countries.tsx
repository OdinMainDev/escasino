import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import { getCountriesApi } from '@/app/api/core/getCountries';

interface CountriesContextType {
  countries: string[] | null;
  loading: boolean;
}

const CountriesContext = createContext<CountriesContextType>({ countries: null, loading: true });

export const useCountries = (): CountriesContextType => {
  const context = useContext(CountriesContext);
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountriesProvider');
  }
  return context;
};

interface CountriesProviderProps {
  children: ReactNode;
}

export const CountriesProvider: FunctionComponent<CountriesProviderProps> = ({ children }) => {
  const [countries, setCountries] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      const fetchedCountries = await getCountriesApi();
      setCountries(fetchedCountries);
      setLoading(false);
    };

    void loadCountries();
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, loading }}>{children}</CountriesContext.Provider>
  );
};
