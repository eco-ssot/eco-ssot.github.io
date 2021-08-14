import Router from '../router';
import QueryParams from '../renderless/query-params/QueryParams';
import Loader from '../renderless/loader/Loader';

export default function App() {
  return (
    <>
      <Loader />
      <Router>
        <QueryParams />
      </Router>
    </>
  );
}
