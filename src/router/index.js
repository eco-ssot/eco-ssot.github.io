import { Redirect, Route, BrowserRouter, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { privateRoutes } from './routes';

import LoginPage from '../pages/login/LoginPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Redirect from="/" to="/home" />
      <Switch>
        {privateRoutes.map(({ path, component: Component }) => (
          <PrivateRoute exact key={path} path={path} component={Component} />
        ))}
        <Route path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}
