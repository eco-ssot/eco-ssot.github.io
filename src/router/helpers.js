import { lazy } from 'react';

export const lazyPreload = (factory) => {
  const component = lazy(factory);
  component.preload = factory;
  return component;
};
