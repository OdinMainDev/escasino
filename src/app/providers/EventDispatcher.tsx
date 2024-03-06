import React, { ReactNode, useEffect } from 'react';
import { usePathname } from '@/app/helpers/navigation';
import { usePreloader } from './preloader';

interface EventDispatcherProviderProps {
  children: ReactNode;
}

export const EventDispatcherProvider: React.FC<EventDispatcherProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const { showPreloader } = usePreloader();

  useEffect(() => {
    showPreloader();
    switch (pathname) {
      default:
        break;
    }
  }, [pathname]);

  return <>{children}</>;
};
