import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSettingsApi } from '@/app/api/core/getSettings';

const defaultState = {
  settings: null,
  loading: true,
};

const SettingsContext = createContext(defaultState);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const settings = await getSettingsApi();
      setSettings(settings);
      setLoading(false);
    };

    void loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>{children}</SettingsContext.Provider>
  );
};
