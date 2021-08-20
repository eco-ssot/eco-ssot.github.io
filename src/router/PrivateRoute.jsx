import { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import Layout from '../components/layout/Layout';
import PageContainer from '../components/page-container/PageContainer';

export default function PrivateRoute({
  component: Component,
  skeleton: Skeleton = PageContainer,
  ...rest
}) {
  const { keycloak } = useKeycloak();
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
