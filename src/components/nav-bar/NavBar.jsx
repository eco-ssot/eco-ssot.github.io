import { Fragment, useCallback, useMemo } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import qs from 'query-string';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import APP_CONSTANTS from '../../app/appConstants';
import { selectLanguage } from '../../renderless/location/locationSlice';
import MyNavLink from '../../router/MyNavLink';
import { privateRoutes } from '../../router/routes';

export default function NavBar({ className }) {
  const { t } = useTranslation(['location']);
  const lng = useSelector(selectLanguage);
  const { pathname, search } = useLocation();
  const tabs = useMemo(() => privateRoutes.filter((route) => !route.hidden), []);
  const preloadElements = useCallback((route) => {
    route.element?.preload?.();
    route.routes?.forEach(preloadElements);
  }, []);

  return (
    <div className={clsx('flex flex-grow space-x-4', className)}>
      {tabs.map(({ path, i18nKey, element, routes, prefetchApis, index }, i) => (
        <MyNavLink
          onMouseEnter={() => preloadElements({ element, routes })}
          aria-label={`nav-${i18nKey}`}
          key={i}
          to={{
            pathname: path,
            search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS),
          }}
          state={{ from: pathname }}
          className={({ isActive }) =>
            clsx(
              'inline-flex items-center border-b-2 px-1 pt-1 text-lg font-medium text-current',
              isActive || (index && pathname === '/')
                ? 'border-primary-600 text-gray-50'
                : 'border-primary-800 text-gray-200 hover:text-gray-50',
              i > 4 && clsx(/en/i.test(lng) ? 'hidden' : 'hidden 1k:block')
            )
          }
          prefetchApis={prefetchApis}
        >
          <span className="block truncate">{t(i18nKey)}</span>
        </MyNavLink>
      ))}
      <div className={clsx('relative block', !/en/i.test(lng) && '1k:hidden')}>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex w-full items-center justify-center rounded-md py-2 px-3 text-lg font-medium text-gray-50 hover:bg-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            More
            <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-200 hover:text-gray-50" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 mt-1 w-48 origin-top-right rounded-md border border-divider bg-primary-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {tabs.slice(5).map(({ path, i18nKey, element, routes, prefetchApis }, i) => (
                <div className="px-1 py-1" key={i}>
                  <Menu.Item>
                    {({ active }) => (
                      <MyNavLink
                        onMouseEnter={() => preloadElements({ element, routes })}
                        to={{
                          pathname: path,
                          search: qs.pick(search, APP_CONSTANTS.GLOBAL_QUERY_KEYS),
                        }}
                        state={{ from: pathname }}
                        className={clsx(
                          'group flex w-full items-center rounded-md px-2 py-2 text-lg font-medium text-current',
                          active ? 'bg-primary-600 text-gray-50' : 'text-gray-200 hover:text-gray-50'
                        )}
                        prefetchApis={prefetchApis}
                      >
                        <span className="block truncate">{t(i18nKey)}</span>
                      </MyNavLink>
                    )}
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
