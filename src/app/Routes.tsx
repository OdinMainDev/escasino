import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Layout from './assets/layout';

import Home from '@/pages/Home';
import { Profile, ProfileDocument, ProfileEdit } from '@/pages/Profile';
import GamesFilter from '@/pages/Games/Filter';
// import TermsPage from '@/pages/Terms';
// import Game from '@/pages/Games/Game';
// import Search from '@/pages/Search/Results/ui/Search';
import {
  HomeGamesProvider,
  AuthGuardProvider,
  GameCategoriesProvider,
  GameProvidersProvider,
  BillingGroupsProvider,
  PaymentProvidersProvider,
  PaymentAllProvidersProvider,
  WithdrawProvidersProvider,
  WithdrawAllProvidersProvider,
} from './providers/pages';
import { ErrorCountry, ErrorUnavailable, Error404 } from '@/pages/Error';
import GamesSearch from '@/pages/Games/Search';
import Details from '@/pages/Games/Details';
import Demo from '@/pages/Play/Demo';
import Real from '@/pages/Play/Real';
import Wallet from '@/pages/Wallet';
import Currencies from '@/pages/Wallet/Currencies';
import LanguageGuard from './providers/LanguageGuard';
import GlobalModals from './providers/GlobalModals';
import { AuthSocialVk } from '@/pages/Auth';
import { Bonuses, BonusesGames } from '@/pages/Bonus';
import BonusesProvider from './providers/pages/BonusesProvider';

const availRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <HomeGamesProvider>
        <Home />
      </HomeGamesProvider>
    ),
  },
  {
    path: 'bonus',
    children: [
      {
        index: true,
        element: (
          <BonusesProvider>
            <Bonuses />
          </BonusesProvider>
        ),
      },
      {
        path: ':id',
        element: (
          <BonusesProvider>
            <Bonuses />
          </BonusesProvider>
        ),
      },
      {
        path: 'games',
        element: <BonusesGames />,
      },
    ],
  },
  {
    path: 'games',
    children: [
      {
        path: 'details/:id',
        element: (
          <BonusesProvider>
            <Details />
          </BonusesProvider>
        ),
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
      // TODO: удалить позже по концу разработки
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
        element: <Navigate to="replenish" replace />,
      },
      {
        path: 'deposit/:tab',
        element: (
          <BonusesProvider>
            <BillingGroupsProvider>
              <PaymentProvidersProvider>
                <PaymentAllProvidersProvider>
                  <WithdrawProvidersProvider>
                    <WithdrawAllProvidersProvider>
                      <Wallet />
                    </WithdrawAllProvidersProvider>
                  </WithdrawProvidersProvider>
                </PaymentAllProvidersProvider>
              </PaymentProvidersProvider>
            </BillingGroupsProvider>
          </BonusesProvider>
        ),
      },
      {
        path: 'currencies',
        element: <Currencies />,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'socials/vk',
        element: <AuthSocialVk />,
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
