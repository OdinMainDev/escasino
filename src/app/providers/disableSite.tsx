import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';

interface DisableSiteContextType {
  isDisabled: boolean;
  disableApplication: () => void;
}

const DisableSiteContext = createContext<DisableSiteContextType | undefined>(undefined);

export const useDisableSite = (): DisableSiteContextType => {
  const context = useContext(DisableSiteContext);
  if (context === undefined) {
    throw new Error('useDisableSite must be used within a DisableSiteProvider');
  }
  return context;
};

interface DisableSiteProviderProps {
  children: ReactNode;
}

export const DisableSiteProvider: FunctionComponent<DisableSiteProviderProps> = ({ children }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const disableApplication = (): void => setIsDisabled(true);

  return (
    <DisableSiteContext.Provider value={{ isDisabled, disableApplication }}>
      {children}
    </DisableSiteContext.Provider>
  );
};

export default DisableSiteProvider;
