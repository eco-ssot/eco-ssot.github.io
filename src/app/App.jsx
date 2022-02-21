import { Suspense } from 'react';

import ReactGA from 'react-ga';

import ErrorHandler from '../renderless/error-handler/ErrorHandler';
import Language from '../renderless/language/Language';
import Loader from '../renderless/loader/Loader';
import Location from '../renderless/location/Location';
import TabTitle from '../renderless/tab-title/TabTitle';
import Router from '../router';

const trackingId = 'UA-171033255-1';
ReactGA.initialize(trackingId, { debug: true, gaOptions: { cookieDomain: 'auto' } });

export default function App() {
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
