import { Navigate, useLocation } from 'react-router-dom';

import SuspenseIcon from '../components/suspense/SuspenseIcon';
import useAuth from '../hooks/useAuth';
import ErrorPage from '../pages/errors/ErrorPage';

export default function RequireAuth({ children }) {
  const { authenticated, authenticating, isLoading, isError, user } = useAuth();
  const { pathname } = useLocation();
  if (isError) {
    return <ErrorPage />;
  }

  if (authenticating || isLoading) {
    return <SuspenseIcon />;
  }

  if (!authenticated) {
    return <Navigate replace to="/login" state={{ from: pathname }} />;
  }

  if (!user && !isError) {
    return <Navigate replace to="/unauthorized" state={{ from: pathname }} />;
  }

  return children;
}
