import React, { createContext, useContext, useState } from 'react';

const DisableSiteContext = createContext();

export const useDisableSite = () => useContext(DisableSiteContext);

export const DisableSiteProvider = ({ children }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const disableApplication = () => setIsDisabled(true);

  return (
    <DisableSiteContext.Provider value={{ isDisabled, disableApplication }}>
      {children}
    </DisableSiteContext.Provider>
  );
};

export default DisableSiteProvider;
