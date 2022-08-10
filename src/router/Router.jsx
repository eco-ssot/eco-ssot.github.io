import { Fragment, Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import PageContainer from '../components/page-container/PageContainer';
import AuthPage from '../pages/auth/AuthPage';
import ErrorPage from '../pages/errors/ErrorPage';

import RequireAuth from './RequireAuth';
import { publicRoutes, privateRoutes } from './routes';

export function toRoute({ index, path, routes, element: Element = Outlet, skeleton: Skeleton = PageContainer }, i) {
  return (
    <Fragment key={i}>
      {index && (
        <Route
          index
          element={
            <ErrorBoundary FallbackComponent={ErrorPage}>
              <Suspense fallback={<Skeleton />}>
                <Element />
              </Suspense>
            </ErrorBoundary>
          }
        />
      )}
      {path && (
        <Route
          path={path}
          element={
            <ErrorBoundary FallbackComponent={ErrorPage}>
              <Suspense fallback={<Skeleton />}>
                <Element />
              </Suspense>
            </ErrorBoundary>
          }
        >
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
        <Route path="/login" element={<AuthPage />}></Route>
        <Route path="/" element={<Layout />}>
          {publicRoutes.map(({ path, element: Element }, i) => (
            <Route
              exact
              key={i}
              path={path}
              element={
                <Suspense fallback={<></>}>
                  <Element />
                </Suspense>
              }
            />
          ))}
        </Route>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          {privateRoutes.map(toRoute)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
