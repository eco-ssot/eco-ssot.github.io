import ErrorHandler from '../renderless/error-handler/ErrorHandler';
import Loader from '../renderless/loader/Loader';
import Location from '../renderless/location/Location';
import TabTitle from '../renderless/tab-title/TabTitle';
import Router from '../router';

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
