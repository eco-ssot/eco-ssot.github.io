import { Suspense } from 'react';

import ReactGA from 'react-ga';

import ErrorHandler from '../renderless/error-handler/ErrorHandler';
import Language from '../renderless/language/Language';
import Loader from '../renderless/loader/Loader';
import Location from '../renderless/location/Location';
import TabTitle from '../renderless/tab-title/TabTitle';
import Router from '../router';

const trackingId = 'UA-171033255-1';

export default function App() {
  ReactGA.initialize(trackingId);
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
