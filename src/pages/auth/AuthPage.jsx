import { Navigate } from 'react-router-dom';
import { useMount } from 'react-use';

import SuspenseIcon from '../../components/suspense/SuspenseIcon';
import useAuth from '../../hooks/useAuth';

function Login({ login }) {
  useMount(() => login(), []);
  return <SuspenseIcon />;
}

export default function AuthPage() {
  const { authenticated, authenticating, login } = useAuth();
  if (authenticating) {
    return <SuspenseIcon />;
  }

  if (!authenticated) {
    return <Login login={login} />;
  }

  if (authenticated) {
    const from = JSON.parse(sessionStorage.getItem('location-from'));
    return <Navigate replace to={from || '/'} />;
  }

  return <SuspenseIcon />;
}
