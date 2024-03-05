import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { GamePage, } from '@/pages/Games';
import { Home } from '@/pages/Home';

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
    ],
  },
  {
    path: '*',
    element: <App />,
  },
];
export const router = createBrowserRouter(routes);

export default routes;
