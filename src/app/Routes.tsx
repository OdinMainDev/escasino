import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Layout from './assets/layout';

import Home from '@/pages/Home';
import { Profile, ProfileDocument, ProfileEdit } from '@/pages/Profile';
import GamesFilter from '@/pages/Games/Filter';
// import TermsPage from '@/pages/Terms';
// import Game from '@/pages/Games/Game';
// import Search from '@/pages/Search/Results/ui/Search';
import { HomeGames } from './providers/pages';
import { ErrorCountry, ErrorUnavailable, Error404 } from '@/pages/Error';
import GameCategoriesProvider from './providers/pages/GameCategories';
import GameProvidersProvider from './providers/pages/GameProviders';
import GamesSearch from '@/pages/Games/Search';
import Details from '@/pages/Games/Details';
import AuthGuardProvider from './providers/pages/AuthGuard';
import Demo from '@/pages/Play/Demo';
import Real from '@/pages/Play/Real';
import Wallet from '@/pages/Wallet';
import Currencies from '@/pages/Wallet/Currencies';
import LanguageGuard from './providers/LanguageGuard';
import GlobalModals from './providers/GlobalModals';

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
      {
        path: 'details/:id',
        element: <Details />,
      },
      {
        path: 'search',
        element: <GamesSearch />,
      },
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
    path: 'play',
    children: [
      {
        path: 'demo/:id',
        element: <Demo />,
      },
      {
        path: 'real/:id',
        element: <Real />,
      },
      {
        path: ':id',
        element: <Details />,
      },
    ],
  },

  {
    path: 'profile',
    element: <AuthGuardProvider />,
    children: [
      {
        path: '',
        element: <Profile />,
      },
      {
        path: 'edit',
        element: <ProfileEdit />,
      },
      {
        path: 'document',
        element: <ProfileDocument />,
      },
    ],
  },

  {
    path: 'wallet',
    element: <AuthGuardProvider />,
    children: [
      {
        path: 'deposit',
        element: <Wallet />,
      },
      {
        path: 'currencies',
        element: <Currencies />,
      },
    ],
  },
  {
    path: 'error',
    children: [
      {
        path: 'unavailable',
        element: <ErrorUnavailable />,
      },
      {
        path: 'country',
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
            element: <GlobalModals />,
            children: [
              {
                path: '/:lang',
                element: <LanguageGuard />,
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
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
