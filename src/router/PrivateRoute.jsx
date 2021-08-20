import { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import PageContainer from '../components/page-container/PageContainer';

export default function PrivateRoute({
  location,
  component: Component,
  skeleton: Skeleton = PageContainer,
  ...rest
}) {
  const authenticated = false;
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Layout match={props.match}>
            <Suspense fallback={<Skeleton />}>
              <Component {...props} />
            </Suspense>
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
