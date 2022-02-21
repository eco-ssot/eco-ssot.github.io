import { Suspense } from 'react';

import ReactGA from 'react-ga';

import ErrorHandler from '../renderless/error-handler/ErrorHandler';
import Language from '../renderless/language/Language';
import Loader from '../renderless/loader/Loader';
import Location from '../renderless/location/Location';
import TabTitle from '../renderless/tab-title/TabTitle';
import Router from '../router';

export default function App() {
  ReactGA.initialize('UA-221054544-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
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
