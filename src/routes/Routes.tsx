
import { Router } from '@remix-run/router';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { NotFoundLazy, PokemonsLayout, PokemonsAllLayout, AboutLazy, HistoryLazy } from './LazyComps';


const routeList: Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundLazy />,
    children: [
      { index: true, element: <Navigate replace to="pokemons" /> },
      {
        path: 'pokemons',
        element: <PokemonsLayout />,
        children: [
          {
            index: true,
            element: <PokemonsAllLayout />
          },
        ]
      },
      {
        path: 'about',
        element: <AboutLazy />
      },
      {
        path: 'history',
        element: <HistoryLazy />
      },
    ]
  }
]);

export default routeList;