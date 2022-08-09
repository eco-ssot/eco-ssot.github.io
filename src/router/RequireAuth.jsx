import { Navigate, useLocation } from 'react-router-dom';

import SuspenseIcon from '../components/suspense/SuspenseIcon';
import useAuth from '../hooks/useAuth';

export default function RequireAuth({ children }) {
  const { authenticated, authenticating, isLoading, user } = useAuth();
  const { pathname } = useLocation();
  if (authenticating || isLoading) {
    return <SuspenseIcon />;
  }

  if (!authenticated) {
    return <Navigate replace to="/login" state={{ from: pathname }} />;
  }

  if (!user) {
    return <Navigate replace to="/unauthorized" state={{ from: pathname }} />;
  }

  return children;
}
