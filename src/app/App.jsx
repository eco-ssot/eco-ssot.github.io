import Router from '../router';
import QueryParams from '../renderless/query-params/QueryParams';
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
        <QueryParams />
      </Router>
    </>
  );
}
