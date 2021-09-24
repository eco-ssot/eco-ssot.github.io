import { Redirect, Route, Switch, Router as BrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import history from './history';
import { publicRoutes, privateRoutes, subRoutes } from './routes';

export default function Router({ children }) {
  return (
    <BrowserRouter history={history}>
      {children}
      <Switch>
        {publicRoutes.map(({ path, component: Component }, i) => (
          <Route key={i} path={path} component={Component} />
        ))}
        {privateRoutes.concat(subRoutes).map(({ path, component: Component, skeleton: Skeleton }, i) => (
          <PrivateRoute key={i} path={path} component={Component} skeleton={Skeleton} />
        ))}
        <Redirect exact from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}
