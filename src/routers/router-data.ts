import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    // element: <Index></Index>,
    loader: function () {},
    // ErrorBoundary: ErrorPage,
    lazy: () => import('@/pageRouter/index/index'),
  },
  {
    path: '/my',
    lazy: () => import('@/pageRouter/my/index'),
  },
]);
