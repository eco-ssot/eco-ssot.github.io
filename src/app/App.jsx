import { useMount } from 'react-use';

import Router from '../router';
import QueryParams from '../renderless/QueryParams';

export default function App() {
  useMount(() => {
    document.documentElement.classList.add('dark');
  });

  return (
    <>
      <Router>
        <QueryParams />
      </Router>
    </>
  );
}
