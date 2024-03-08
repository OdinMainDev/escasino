// import React, { ReactNode, useEffect } from 'react';
import React, { ReactNode } from 'react';

interface EventDispatcherProviderProps {
  children: ReactNode;
}

export const EventDispatcherProvider: React.FC<EventDispatcherProviderProps> = ({ children }) => {
  // const pathname = usePathname();
  // const { showPreloader } = usePreloader();
  // const { isAuth } = useIsAuth();
  // const { updateUser } = useUser();

  // useEffect(() => {
  //   showPreloader();
  //   if (isAuth) {
  //     updateUser();
  //   }
  //   switch (pathname) {
  //     default:
  //       break;
  //   }
  // }, [pathname]);

  return <>{children}</>;
};
