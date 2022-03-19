import { Fragment, Suspense } from 'react';

import { nanoid } from 'nanoid';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import PageContainer from '../components/page-container/PageContainer';

import RequireAuth from './RequireAuth';
import { publicRoutes, privateRoutes } from './routes';

export default function Router({ children }) {
  return (
    <BrowserRouter>
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
          {privateRoutes.map(({ index, indexPath, path, element: Element, skeleton: Skeleton = PageContainer }) => (
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
              <Route
                path={path}
                element={
                  <Suspense fallback={<Skeleton />}>
                    <Element />
                  </Suspense>
                }
              />
            </Fragment>
          ))}
        </Route>
      </Routes>
      {children}
    </BrowserRouter>
  );
}
