import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Layout from './assets/layout';

import Home from '@/pages/Home';
import { Profile, ProfileEdit } from '@/pages/Profile';
import GamesFilter from '@/pages/Games/Filter';
// import TermsPage from '@/pages/Terms';
// import Game from '@/pages/Games/Game';
// import Search from '@/pages/Search/Results/ui/Search';
import { HomeGames } from './providers/pages';
import { ErrorCountry, ErrorUnavailable, Error404 } from '@/pages/Error';
import GameCategoriesProvider from './providers/pages/GameCategories';
import GameProvidersProvider from './providers/pages/GameProviders';

const availRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <HomeGames>
        <Home />
      </HomeGames>
    ),
  },
  {
    path: 'games',
    children: [
      // {
      //   path: 'search',
      //   element: <GamesSearch />,
      // },
      {
        path: 'filter',
        element: (
          <GameCategoriesProvider>
            <GameProvidersProvider>
              <GamesFilter />
            </GameProvidersProvider>
          </GameCategoriesProvider>
        ),
      },
      {
        path: 'bugpage',
        element: <GamesFilter />,
      },
    ],
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        element: <Profile />,
      },
      {
        path: 'edit',
        element: <ProfileEdit />,
      },
    ],
  },

  // TODO: сделать внешку ошибкам
  {
    path: 'error',
    children: [
      {
        path: 'unavailable', // казино недоступно ( ремонтные работы )
        element: <ErrorUnavailable />,
      },
      {
        path: 'country', // блок по стране
        element: <ErrorCountry />,
      },
    ],
  },
];

const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            // TODO: переделать на значение из конфига
            path: '/:lang',
            children: availRoutes,
          },
          {
            children: availRoutes,
          },
          {
            path: '*',
            element: <Error404 />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
