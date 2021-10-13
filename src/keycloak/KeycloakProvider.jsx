import { ReactKeycloakProvider } from '@react-keycloak/web';

import history from '../router/history';

import keycloak from './keycloak';

const onEvent = (event, error) => {
  console.log('onKeycloakEvent', { event, error });
  if (event === 'onReady') {
    history.replace(window.location.href.replace(window.location.origin, ''));
  }
};

const onTokens = (tokens) => {
  console.log('onKeycloakTokens', { tokens });
  localStorage.setItem('token', tokens?.token);
};

export default function KeycloakProvider({ children }) {
  return (
    <ReactKeycloakProvider
      initOptions={{ checkLoginIframe: false }}
      authClient={keycloak}
      onEvent={onEvent}
      onTokens={onTokens}
      LoadingComponent={
        <div className="flex flex-col space-y-2 items-center justify-center w-screen h-screen">
          <img className="w-32 h-32 animate-pulse" src="/logo-128x128.png" alt="logo" />
        </div>
      }>
      {children}
    </ReactKeycloakProvider>
  );
}
