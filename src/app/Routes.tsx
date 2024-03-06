import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from '@/views/pages/Home';
import GamePage from '@/views/pages/Games/Single/Game';
import ProfilePage from '@/views/pages/Home';
import ProfileEditPage from '@/views/pages/Home';
import TermsPage from '@/views/pages/Terms';
import WalletPage from '@/views/pages/Home';
import SearchPage from '@/views/pages/Games/Search';

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
        element: <ProfilePage />,
        children: [
          {
            path: 'edit',
            element: <ProfileEditPage />,
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
