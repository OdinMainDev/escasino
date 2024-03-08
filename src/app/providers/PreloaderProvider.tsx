import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';

interface PreloaderContextType {
  isLoading: boolean;
  showPreloader: () => void;
  hidePreloader: () => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const usePreloader = (): PreloaderContextType => {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
};

interface PreloaderProviderProps {
  children: ReactNode;
}

export const PreloaderProvider: FunctionComponent<PreloaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const showPreloader = (): void => setIsLoading(true);
  const hidePreloader = (): void => setIsLoading(false);

  return (
    <PreloaderContext.Provider value={{ isLoading, showPreloader, hidePreloader }}>
      {children}
    </PreloaderContext.Provider>
  );
};
