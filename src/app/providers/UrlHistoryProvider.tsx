import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type UrlHistoryContextType = {
  history: string[];
  resaveHistory: (history: string[]) => void;
};

const UrlHistoryContext = createContext<UrlHistoryContextType | undefined>(undefined);

interface UrlHistoryProviderProps {
  children: ReactNode;
}

export const UrlHistoryProvider: React.FC<UrlHistoryProviderProps> = ({ children }) => {
  const location = useLocation();
  const [history, setHistory] = useState<string[]>(['/']);

  useEffect(() => {
    let lastLoc = '';
    const curLoc = location.pathname;
    if (history.length > 0) {
      lastLoc = history[history.length - 1];
    }
    if (!areSameRoute(lastLoc, curLoc)) {
      setHistory((prevHistory) => [...prevHistory, location.pathname]);
    }
  }, [location.pathname]);

  const resaveHistory = (history: string[]) => {
    setHistory(history);
  };

  return (
    <UrlHistoryContext.Provider value={{ history, resaveHistory }}>
      {children}
    </UrlHistoryContext.Provider>
  );
};

export const useUrlHistory = (): UrlHistoryContextType => {
  const context = useContext(UrlHistoryContext);
  if (context === undefined) {
    throw new Error('useUrlHistory must be used within a UrlHistoryProvider');
  }
  return context;
};

export const areSameRoute = (path1: string, path2: string): boolean => {
  const normalizePath = (path: string) => {
    let normalizedPath = path.replace(/^\/[a-z]{2}\//, '/');
    normalizedPath = normalizedPath.replace(/\/$/, '').split('?')[0];
    normalizedPath = normalizedPath.replace(/\/\d+$/, '');
    normalizedPath = normalizedPath.replace(/\/deposit\/.*$/, '/deposit');
    return normalizedPath;
  };

  return normalizePath(path1) === normalizePath(path2);
};

export const removeAllLangsFromUri = (path: string) => {
  path = path.replace(/^\/([a-z]{2}\/)+([a-z]{2})\//, '/$2/');
  return path.replace(/^\/[a-z]{2}\//, '/');
};
