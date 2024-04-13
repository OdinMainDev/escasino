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

// TODO исправить прелоадер, чтобы не было ошибок с ним
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
    if (pathname != '/games/filter' && pathname != '/games/search') {
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
