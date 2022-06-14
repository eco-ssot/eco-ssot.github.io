import { useEffect } from 'react';

import nprogress from 'nprogress';
import { useSelector } from 'react-redux';

import { selectIsLoadingPage } from '../../app/appSlice';

import 'nprogress/nprogress.css';

nprogress.configure({
  showSpinner: false,
});

export default function ProgressBar() {
  const isLoadingPage = useSelector(selectIsLoadingPage);
  useEffect(() => {
    let progressBarTimeout = null;
    const startProgressBar = () => {
      clearTimeout(progressBarTimeout);
      progressBarTimeout = setTimeout(nprogress.start, 200);
    };

    const stopProgressBar = () => {
      clearTimeout(progressBarTimeout);
      nprogress.done();
    };

    if (isLoadingPage) {
      startProgressBar();
    }

    return () => {
      stopProgressBar();
    };
  }, [isLoadingPage]);

  return null;
}
