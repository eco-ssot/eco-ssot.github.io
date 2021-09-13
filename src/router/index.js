import { Redirect, Route, Switch, Router as BrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { publicRoutes, privateRoutes, subRoutes } from './routes';
import history from './history';

export default function Router({ children }) {
  return (
    <BrowserRouter history={history}>
      {children}
      <Switch>
        {publicRoutes.map(({ path, component: Component }) => (
          <Route exact key={path} path={path} component={Component} />
        ))}
        {privateRoutes.concat(subRoutes).map(({ path, component: Component, skeleton: Skeleton }) => (
          <PrivateRoute exact key={path} path={path} component={Component} skeleton={Skeleton} />
        ))}
        <Redirect exact from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}
