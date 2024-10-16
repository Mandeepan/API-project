import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import * as sessionActions from './store/session';
//components
import Navigation from './components/Navigation';
import SpotTiles from './components/SpotTiles';
import SpotDetail from './components/SpotDetail/SpotDetail';

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
        // element: <h2> more to come</h2>
				element: <SpotDetail />,
			},
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;