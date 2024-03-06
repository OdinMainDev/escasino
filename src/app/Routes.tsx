import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from '@/views/pages/Home';
import GamePage from '@/views/pages/Games/Single/Game';
import TermsPage from '@/views/pages/Terms';
import WalletPage from '@/views/pages/Home';
import SearchPage from '@/views/pages/Games/Search';
import { Profile, ProfileEdit } from '@/views/pages/Profile';

const routes: RouteObject[] = [
  {
    element: <App />,
    path: '/:lang',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'games',
        children: [
          {
            path: ':id',
            element: <GamePage />,
          },
          {
            path: 'search',
            element: <SearchPage />,
          },
        ],
      },
      {
        path: 'profile',
        element: <Profile />,
        children: [
          {
            path: 'edit',
            element: <ProfileEdit />,
          },
        ],
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'wallet',
        element: <WalletPage />,
      },
    ],
  },
  {
    path: '*',
    element: <App />,
  },
];
export const router = createBrowserRouter(routes);

export default routes;
