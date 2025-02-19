import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Layout from './assets/layout';

import Home from '@/pages/Home';
import { Profile, ProfileDocument, ProfileEdit } from '@/pages/Profile';
// import TermsPage from '@/pages/Terms';
// import Game from '@/pages/Games/Game';
// import Search from '@/pages/Search/Results/ui/Search';
import {
  HomeGamesProvider,
  AuthGuardProvider,
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
import { AuthSocialApi, AuthSocialVk } from '@/pages/Auth';
import { Bonuses, BonusesCart, BonusesGames } from '@/pages/Bonus';
import BonusesProvider from './providers/pages/BonusesProvider';
import BonusesList from '@/pages/Bonus/ui/BonusesList';
import { Rules } from '@/pages/Rules';
import NodepositBonusesProvider from './providers/pages/NodepositBonusesProvider';
import PusherModalProvider from './providers/PusherModalProvider';

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
            <NodepositBonusesProvider>
              <Bonuses />
            </NodepositBonusesProvider>
          </BonusesProvider>
        ),
      },
      {
        path: ':id',
        element: (
          <BonusesProvider>
            <NodepositBonusesProvider>
              <Bonuses />
            </NodepositBonusesProvider>
          </BonusesProvider>
        ),
      },
      {
        path: 'nodeposit/:id?',
        element: (
          <BonusesProvider>
            <NodepositBonusesProvider>
              <Bonuses isNoDeposit />
            </NodepositBonusesProvider>
          </BonusesProvider>
        ),
      },
      {
        path: 'list',
        element: (
          <BonusesProvider>
            <NodepositBonusesProvider>
              <BonusesList />
            </NodepositBonusesProvider>
          </BonusesProvider>
        ),
      },
      {
        path: 'games',
        element: <BonusesGames />,
      },
      {
        path: 'cart',
        element: <BonusesCart />,
      },
    ],
  },
  {
    path: 'games',
    children: [
      {
        path: 'details/:id',
        element: (
          <NodepositBonusesProvider>
            <Details />
          </NodepositBonusesProvider>
        ),
      },
      {
        path: 'search',
        element: <GamesSearch />,
      },
    ],
  },
  {
    path: 'rules',
    children: [
      {
        index: true,
        element: <Rules />,
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
        index: true,
        element: (
          <BonusesProvider>
            <NodepositBonusesProvider>
              <Profile />
            </NodepositBonusesProvider>
          </BonusesProvider>
        ),
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
            <NodepositBonusesProvider>
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
            </NodepositBonusesProvider>
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
      {
        path: 'api',
        element: <AuthSocialApi />,
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
            element: <PusherModalProvider />,
            children: [
              {
                element: <GlobalModals />,
                children: [
                  {
                    path: '/:lang',
                    element: (
                      <LanguageGuard />
                    ),
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
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
