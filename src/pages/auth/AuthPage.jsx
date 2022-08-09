import { Navigate } from 'react-router-dom';

import SuspenseIcon from '../../components/suspense/SuspenseIcon';
import useAuth from '../../hooks/useAuth';

export default function AuthPage() {
  const { authenticated } = useAuth();
  if (authenticated) {
    const from = JSON.parse(sessionStorage.getItem('location-from'));
    return <Navigate replace to={from || '/'} />;
  }

  return <SuspenseIcon />;
}
