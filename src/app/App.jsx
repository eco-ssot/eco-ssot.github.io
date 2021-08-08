import { useMount } from 'react-use';

import Router from '../router';

export default function App() {
  useMount(() => {
    document.documentElement.classList.add('dark');
  });

  return <Router />;
}
