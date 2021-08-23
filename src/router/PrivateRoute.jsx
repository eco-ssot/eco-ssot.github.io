import { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import Layout from '../components/layout/Layout';
import PageContainer from '../components/page-container/PageContainer';
import UnauthorizedPage from '../pages/unauthorized/UnauthorizedPage';

export default function PrivateRoute({
  component: Component,
  skeleton: Skeleton = PageContainer,
  ...rest
}) {
  const { keycloak } = useKeycloak();
  if (keycloak?.authenticated && !keycloak?.hasRealmRole('developer')) {
    return <UnauthorizedPage />;
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
