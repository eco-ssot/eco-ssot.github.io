import { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useKeycloak } from '../keycloak';
import Layout from '../components/layout/Layout';
import PageContainer from '../components/page-container/PageContainer';
import APP_CONFIG from '../constants/app-config';

export default function PrivateRoute({ component: Component, skeleton: Skeleton = PageContainer, ...rest }) {
  const { keycloak } = useKeycloak();
  if (
    keycloak?.authenticated &&
    (keycloak?.realmAccess?.roles || []).filter((role) => !APP_CONFIG.KEYCLOAK_DEFAULT_ROLES.includes(role)).length ===
      0
  ) {
    return <Redirect to="/unauthorized" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
          <Layout match={props.match}>
            <Suspense fallback={<Skeleton />}>
              <Component {...props} />
            </Suspense>
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location.pathname },
            }}
          />
        )
      }
    />
  );
}
