import { lazy } from 'react';

export const lazyPreload = (factory) => {
  const component = lazy(factory);
  component.preload = factory;
  return component;
};

export const isMatched =
  (pathname) =>
  ({ path, index, indexPath } = {}) => {
    return pathname === path || (index && pathname === indexPath) || pathname.startsWith(path);
  };
