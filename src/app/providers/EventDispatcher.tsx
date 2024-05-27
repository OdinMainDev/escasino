/* eslint-disable react-hooks/exhaustive-deps */
// import React, { ReactNode, useEffect } from 'react';
import React, { ReactNode, useEffect } from 'react';
import { useAuthProvider } from './AuthProvider';
import { usePathname } from '@/shared/helpers/navigation';
import { getUser } from '@/store/slices/userSlice';
import { useAppDispatch } from '@/store/hooks/redux';
import { useGamesFilters } from './pages/GamesFilter';
import { useModal } from './ModalProvider';

interface EventDispatcherProviderProps {
  children: ReactNode;
}

export const EventDispatcherProvider: React.FC<EventDispatcherProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const { isAuth } = useAuthProvider();
  const { doCloseModals } = useModal();
  const dispatch = useAppDispatch();
  const { getFilters, setFilters } = useGamesFilters();

  // EventDispatcher - миддлвейр для обработки запросов перед страницей
  // если авторизован человек то при каждом обновлении страницы делаем запрос к getMe
  useEffect(() => {
    if (isAuth) {
      void dispatch(getUser());
    }
    function checkPathname(pathname: string) {
      const pathParts = pathname.split('/');
      if (pathname == '/games/filter') {
        return true;
      }
      if (pathname == '/games/search') {
        return true;
      }
      if (pathParts.length === 4 && pathParts[1] === 'games' && pathParts[2] === 'details') {
        return true;
      }

      return false;
    }

    if (!checkPathname(pathname)) {
      const newFilters = getFilters();
      newFilters.categories = [];
      newFilters.providers = [];
      newFilters.is_game_avail_for_bonus = false;
      newFilters.query = '';
      setFilters(newFilters);
    }
    doCloseModals();
  }, [pathname, isAuth]);

  return children;
};
