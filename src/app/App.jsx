import Router from '../router';
import Location from '../renderless/location/Location';
import Loader from '../renderless/loader/Loader';
import ErrorHandler from '../renderless/error-handler/ErrorHandler';
import TabTitle from '../renderless/tab-title/TabTitle';

export default function App() {
  return (
    <>
      <ErrorHandler />
      <Loader />
      <Router>
        <TabTitle />
        <Location />
      </Router>
    </>
  );
}
