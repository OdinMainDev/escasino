// import React, { ReactNode, useEffect } from 'react';
import React, { ReactNode, useEffect } from 'react';
import { usePreloader } from './PreloaderProvider';
import { useAuthProvider } from './AuthProvider';
import { usePathname } from '@/shared/helpers/navigation';
import { getUser } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/hooks/redux';

interface EventDispatcherProviderProps {
  children: ReactNode;
}

// TODO исправить прелоадер, чтобы не было ошибок с ним
export const EventDispatcherProvider: React.FC<EventDispatcherProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const { showPreloader } = usePreloader();
  const { isAuth } = useAuthProvider();
  const dispatch = useAppDispatch();

  // EventDispatcher - миддлвейр для обработки запросов перед страницей
  // если авторизован человек то при каждом обновлении страницы делаем запрос к getMe
  useEffect(() => {
    showPreloader();
    if (isAuth) {
      // TODO: желательно убрать void чтобы было асинхронно
      void dispatch(getUser());
    }
    switch (pathname) {
      default:
        break;
    }
  }, [pathname, isAuth]);

  return <>{children}</>;
};
