import { Route, Redirect } from 'react-router-dom';

import Layout from '../components/layout/Layout';

export default function PrivateRoute({ location, component: Component, ...rest }) {
  const authenticated = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Layout match={props.match}>
            <Component {...props} />
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
