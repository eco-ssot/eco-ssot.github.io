import { Fragment, Suspense } from 'react';

import { nanoid } from 'nanoid';
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import PageContainer from '../components/page-container/PageContainer';

import RequireAuth from './RequireAuth';
import { publicRoutes, privateRoutes } from './routes';

export function toRoute({
  index,
  indexPath,
  path,
  routes,
  element: Element = Outlet,
  skeleton: Skeleton = PageContainer,
}) {
  return (
    <Fragment key={nanoid()}>
      {index && (
        <Route
          index
          path={indexPath}
          element={
            <Suspense fallback={<Skeleton />}>
              <Element />
            </Suspense>
          }
        />
      )}
      {path && (
        <Route
          path={path}
          element={
            <Suspense fallback={<Skeleton />}>
              <Element />
            </Suspense>
          }>
          {routes && routes.map(toRoute)}
        </Route>
      )}
    </Fragment>
  );
}

export default function Router({ children }) {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        {publicRoutes.map(({ path, element: Element }) => (
          <Route
            exact
            key={nanoid()}
            path={path}
            element={
              <Suspense fallback={<></>}>
                <Element />
              </Suspense>
            }
          />
        ))}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }>
          {privateRoutes.map(toRoute)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
