import { Suspense } from 'react';

import SuspenseIcon from '../components/suspense/SuspenseIcon';
import ErrorHandler from '../renderless/error-handler/ErrorHandler';
import Language from '../renderless/language/Language';
import Loader from '../renderless/loader/Loader';
import Location from '../renderless/location/Location';
import TabTitle from '../renderless/tab-title/TabTitle';
import Router from '../router/Router';

export default function App() {
  return (
    <Suspense fallback={<SuspenseIcon />}>
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
