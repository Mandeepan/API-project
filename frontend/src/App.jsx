import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import * as sessionActions from './store/session';
//components
import Navigation from './components/Navigation';
import SpotTiles from './components/SpotTiles';
import SpotDetail from './components/SpotDetail/SpotDetail';
import SpotFormPage from './components/SpotFormPage/SpotFormPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotTiles />
      },
      {
				path: '/spots/:spotId',
				element: <SpotDetail />,
			},
      {
        path:'/spots/new',
        element:<SpotFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;