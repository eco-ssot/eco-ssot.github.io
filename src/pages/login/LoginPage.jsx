import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import Picture from '../../components/picture/Picture';
import { useKeycloak } from '../../keycloak';

export default function LoginPage() {
  const { t } = useTranslation(['loginPage']);
  const { keycloak } = useKeycloak();
  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  if (keycloak?.authenticated) {
    const from = JSON.parse(sessionStorage.getItem('location-from'));
    return <Navigate to={from || '/'} />;
  }

  return (
    <div className="-mt-16 flex h-screen w-screen items-center justify-center overflow-hidden">
      <Header className="fixed top-0 z-50 h-16 w-full" />
      <Picture className="fixed -z-1 h-full w-full" src="/login.webp" fallback="/login.png" alt="login" />
      <div className="flex flex-col items-center space-y-4">
        <div className="text-lg font-medium">{t('loginDescription')}</div>
        <Button className="text-lg" onClick={() => login()}>
          Login with keycloak
        </Button>
      </div>
    </div>
  );
}
