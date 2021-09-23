import { useCallback } from 'react';

import { Redirect, useLocation } from 'react-router-dom';

import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import { useKeycloak } from '../../keycloak';

export default function LoginPage() {
  const { state } = useLocation();
  const { keycloak } = useKeycloak();
  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  if (keycloak?.authenticated) {
    return <Redirect to={state?.from || '/'} />;
  }

  return (
    <div className="flex w-screen h-screen overflow-hidden items-center justify-center">
      <Header className="fixed z-50 h-16 w-full top-0" />
      <img src="/login.png" className="fixed w-full h-full -z-1" alt="login" />
      <div className="flex flex-col space-y-4 items-center">
        <div className="text-lg font-medium">請點擊下方按鈕登入</div>
        <Button className="text-lg" onClick={() => login()}>
          Login with keycloak
        </Button>
      </div>
    </div>
  );
}
