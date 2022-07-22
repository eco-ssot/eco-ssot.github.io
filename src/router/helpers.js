import { lazy } from 'react';

export const lazyPreload = (factory, { name = '' } = {}) => {
  const component = lazy(() => lazyRetry(factory, name));
  component.preload = factory;
  return component;
};

export const lazyRetry = (componentImport, name) => {
  return new Promise((resolve, reject) => {
    // check if the window has already been refreshed
    const hasRefreshed = JSON.parse(sessionStorage.getItem(`retry-${name}-refreshed`) || 'false');
    // try to import the component
    componentImport()
      .then((component) => {
        sessionStorage.setItem(`retry-${name}-refreshed`, 'false'); // success so reset the refresh
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          sessionStorage.setItem(`retry-${name}-refreshed`, 'true'); // we are now going to refresh
          return window.location.reload(); // refresh the page
        }

        reject(error); // Default error behavior as already tried refresh
      });
  });
};
