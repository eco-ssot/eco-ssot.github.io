import { Redirect, Route, Switch, Router as HashRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { privateRoutes } from './routes';
import history from './history';

import LoginPage from '../pages/login/LoginPage';

export default function Router({ children }) {
  return (
    <HashRouter history={history}>
      {children}
      <Switch>
        {privateRoutes.map(({ path, component: Component }) => (
          <PrivateRoute exact key={path} path={path} component={Component} />
        ))}
        <Route path="/login" component={LoginPage} />
        <Redirect from="/" to="/home" />
      </Switch>
    </HashRouter>
  );
}
