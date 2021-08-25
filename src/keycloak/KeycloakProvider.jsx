import { ReactKeycloakProvider } from '@react-keycloak/web';

import keycloak from './keycloak';

import history from '../router/history';

const onEvent = (event, error) => {
  console.log('onKeycloakEvent', { event, error });
  if (event === 'onReady') {
    history.replace(window.location.hash.slice(1));
  }
};

const onTokens = (tokens) => {
  console.log('onKeycloakTokens', { tokens });
  localStorage.setItem('token', tokens?.token);
};

export function KeycloakProvider({ children }) {
  return (
    <ReactKeycloakProvider
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

export default Number(process.env.REACT_APP_MOCK)
  ? ({ children }) => <>{children}</>
  : KeycloakProvider;
