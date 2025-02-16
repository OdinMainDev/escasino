/* eslint-disable react-hooks/exhaustive-deps */
// import React, { ReactNode, useEffect } from 'react';
import React, { ReactNode, useEffect } from 'react';
import { useAuthProvider } from './AuthProvider';
import { usePathname } from '@/shared/helpers/navigation';
import { getUser } from '@/store/slices/userSlice';
import { setUserMeta } from '@/store/slices/setUserMetsSlice';
import { useAppDispatch } from '@/store/hooks/redux';
import { useGamesFilters } from './pages/GamesFilter';
import { resetCartBonuses } from '@/store/slices/cartBonusesSlice';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useCurrentLanguage } from './LangProvider';

interface EventDispatcherProviderProps {
  children: ReactNode;
}

export const EventDispatcherProvider: React.FC<EventDispatcherProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const language = useCurrentLanguage();

  const { isAuth } = useAuthProvider();
  const dispatch = useAppDispatch();
  const { getFilters, setFilters } = useGamesFilters();

  const handleUserMeta = async () => {
    const fid = await getVisitorId();
    void dispatch(setUserMeta({ fid: fid, language: language.toUpperCase() }));
  };

  // EventDispatcher - миддлвейр для обработки запросов перед страницей
  // если авторизован человек то при каждом обновлении страницы делаем запрос к getMe
  useEffect(() => {
    if (isAuth) {
      void dispatch(getUser());
      void handleUserMeta();
    }
    function checkAvailGameFilterPathname(pathname: string) {
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

    function checkAvailBonusCartPathname(pathname: string) {
      const pathParts = pathname.split('/');
      const validPaths = [
        '/wallet/deposit/replenish',
        '/wallet/deposit/withdraw',
        '/wallet/deposit/history',
        '/bonus',
      ];

      // Check if the path matches any of the valid paths directly
      if (validPaths.includes(pathname)) {
        return true;
      }

      // Check if the path includes a language prefix or game ID
      const langPaths = validPaths.map((path) => `/${pathParts[1]}${path}`);
      if (langPaths.includes(pathname)) {
        return true;
      }

      // Check for bonus with GAME_ID
      if (pathParts[1] === 'bonus' || (pathParts.length > 2 && pathParts[2] === 'bonus')) {
        return true;
      }
    }

    if (!checkAvailBonusCartPathname(pathname)) {
      dispatch(resetCartBonuses());
    }

    if (!checkAvailGameFilterPathname(pathname)) {
      const newFilters = getFilters();
      newFilters.categories = [];
      newFilters.providers = [];
      newFilters.is_game_avail_for_bonus = false;
      newFilters.query = '';
      setFilters(newFilters);
    }
  }, [pathname, isAuth]);

  return children;
};
