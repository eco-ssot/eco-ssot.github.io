import { ReactKeycloakProvider } from '@react-keycloak/web';

import APP_CONSTANTS from '../app/appConstants';
import Picture from '../components/picture/Picture';

import keycloak from './keycloak';

const onEvent = (event, error) => {
  console.log('onKeycloakEvent', { event, error });
  const from = JSON.parse(sessionStorage.getItem('location-from'));
  if (window.location.pathname !== '/login') {
    sessionStorage.setItem(
      'location-from',
      JSON.stringify(
        from?.logout
          ? { pathname: '/', search: '', hash: '' }
          : { pathname: window.location.pathname, search: window.location.search, hash: window.location.hash }
      )
    );
  }
};

const onTokens = (keycloak) => (tokens) => {
  console.log('onKeycloakTokens', { tokens });
  localStorage.setItem('token', tokens?.token);
  console.log(keycloak?.tokenParsed);
  localStorage.setItem(
    'roles',
    JSON.stringify(
      keycloak?.tokenParsed?.realm_access?.roles?.filter?.(
        (role) => !APP_CONSTANTS.KEYCLOAK_DEFAULT_ROLES.includes(role)
      )
    )
  );
};

export default function KeycloakProvider({ children }) {
  return (
    <ReactKeycloakProvider
      initOptions={{ checkLoginIframe: false }}
      authClient={keycloak}
      onEvent={onEvent}
      onTokens={onTokens(keycloak)}
      LoadingComponent={
        <div className="flex flex-col space-y-2 items-center justify-center w-screen h-screen">
          <Picture
            className="w-32 h-32 animate-pulse"
            src="/logo-128x128.webp"
            fallback="/logo-128x128.png"
            alt="logo"
          />
        </div>
      }>
      {children}
    </ReactKeycloakProvider>
  );
}
