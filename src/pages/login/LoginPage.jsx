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
    <div className="flex w-screen h-screen overflow-hidden items-center justify-center -mt-16">
      <Header className="fixed z-50 h-16 w-full top-0" />
      <Picture className="fixed w-full h-full -z-1" src="/login.webp" fallback="/login.png" alt="login" />
      <div className="flex flex-col space-y-4 items-center">
        <div className="text-lg font-medium">{t('loginDescription')}</div>
        <Button className="text-lg" onClick={() => login()}>
          Login with keycloak
        </Button>
      </div>
    </div>
  );
}
