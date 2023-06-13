
import { Router } from '@remix-run/router';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { NotFoundLazy, FilmsLayout, FilmsAllLayout, AboutLazy } from './LazyComps';


const routeList: Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundLazy />,
    children: [
      { index: true, element: <Navigate replace to="films" /> },
      {
        path: 'films',
        element: <FilmsLayout />,
        children: [
          {
            index: true,
            element: <FilmsAllLayout />
          },
          // {
          //   path: ':filmId',
          //   element: <CoreMovieLazy />,
          //   loader: movieDetailLoader
          // }
        ]
      },
      {
        path: 'about',
        element: <AboutLazy />
      },
    ]
  }
]);

export default routeList;