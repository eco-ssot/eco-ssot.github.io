import { Suspense } from 'react';

import ErrorHandler from '../renderless/error-handler/ErrorHandler';
import Language from '../renderless/language/Language';
import Loader from '../renderless/loader/Loader';
import Location from '../renderless/location/Location';
import TabTitle from '../renderless/tab-title/TabTitle';
import Router from '../router';
import { useGetSummaryQuery } from '../services/app';

export default function App() {
  useGetSummaryQuery();
  return (
    <Suspense fallback={null}>
      <Language />
      <ErrorHandler />
      <Loader />
      <Router>
        <TabTitle />
        <Location />
      </Router>
    </Suspense>
  );
}
