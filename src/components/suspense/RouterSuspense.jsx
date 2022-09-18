import nprogress from 'nprogress';
import { useLifecycles } from 'react-use';

import 'nprogress/nprogress.css';

nprogress.configure({
  showSpinner: false,
});

export default function RouterSuspense() {
  useLifecycles(
    () => {
      nprogress.start();
    },
    () => {
      nprogress.done();
    }
  );

  return null;
}
