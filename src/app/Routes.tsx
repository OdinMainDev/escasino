import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { GamePage } from '@/pages/Games';
import { Home } from '@/pages/Home';
import { Profile, ProfileEdit } from '@/pages/Profile';
import { Terms } from '@/pages/Terms';
import { Wallet } from '@/pages/Wallet';

const routes: RouteObject[] = [
  {
    element: <App />,
    path: '/:lang',
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'games',
        children: [
          {
            path: ':id',
            element: <GamePage />,
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
        element: <Terms />,
      },
      {
        path: 'wallet',
        element: <Wallet />,
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
