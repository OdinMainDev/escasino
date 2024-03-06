import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import { getSettingsApi } from '@/app/api/core/getSettings';
import { ISettings } from '@/app/entities/settings';

interface SettingsContextType {
  settings: ISettings | null;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({ settings: null, loading: true });

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: FunctionComponent<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<ISettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const fetchedSettings = await getSettingsApi();
      setSettings(fetchedSettings);
      setLoading(false);
    };

    void loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>{children}</SettingsContext.Provider>
  );
};
